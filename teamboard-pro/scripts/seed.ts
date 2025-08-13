import { prisma } from "@/lib/db";
import argon2 from "argon2";

async function main() {
  const alice = await prisma.user.upsert({
    where: { email: "alice@example.com" },
    update: {},
    create: { email: "alice@example.com", name: "Alice Admin", passwordHash: await argon2.hash("password") }
  });
  const bob = await prisma.user.upsert({
    where: { email: "bob@example.com" },
    update: {},
    create: { email: "bob@example.com", name: "Bob Manager", passwordHash: await argon2.hash("password") }
  });

  const org1 = await prisma.organization.create({ data: { name: "Acme Inc", ownerId: alice.id, plan: "PRO" } });
  await prisma.membership.createMany({ data: [{ userId: alice.id, orgId: org1.id, role: "Owner" }, { userId: bob.id, orgId: org1.id, role: "Manager" }] });

  const proj = await prisma.project.create({ data: { orgId: org1.id, name: "Website Revamp", key: "WEB", createdBy: alice.id } });
  await prisma.boardColumn.createMany({ data: [{ projectId: proj.id, name: "Backlog", order: 0 }, { projectId: proj.id, name: "In Progress", order: 1 }, { projectId: proj.id, name: "Review", order: 2 }, { projectId: proj.id, name: "Done", order: 3 }] });

  const backlog = await prisma.boardColumn.findFirst({ where: { projectId: proj.id, order: 0 } });
  for (let i = 0; i < 8; i++) {
    await prisma.task.create({ data: { projectId: proj.id, columnId: backlog!.id, title: `Task ${i + 1}`, description: "Demo task", createdBy: alice.id, order: i } });
  }
  console.log("Seeded ✔");
}
main().then(()=>process.exit(0)).catch((e)=>{ console.error(e); process.exit(1); }); 