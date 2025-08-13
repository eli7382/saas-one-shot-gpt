export default function Pricing() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-6">Pricing</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="border rounded-2xl p-6">
          <h2 className="text-xl font-semibold">Free</h2>
          <ul className="mt-4 list-disc list-inside text-sm">
            <li>Unlimited personal boards</li><li>Basic notifications</li><li>i18n (English & Hebrew)</li>
          </ul>
          <div className="mt-6 text-3xl font-bold">$0</div>
        </div>
        <div className="border rounded-2xl p-6">
          <h2 className="text-xl font-semibold">Pro</h2>
          <ul className="mt-4 list-disc list-inside text-sm">
            <li>Organizations & roles</li><li>Real-time collaboration</li><li>Admin analytics</li><li>Email reminders</li>
          </ul>
          <div className="mt-6 text-3xl font-bold">$9<span className="text-base">/user/mo</span></div>
        </div>
      </div>
    </div>
  );
} 