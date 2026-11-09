export function SkillsLibraryPage() {
  const skills = [
    { name: 'Website chat', plan: 'Basic', available: true, detail: 'Embeddable receptionist on your site.' },
    { name: 'Booking assistant', plan: 'Basic', available: true, detail: 'Collects details and creates an enquiry.' },
    { name: 'Phone calls', plan: 'Add-on', available: false, detail: 'Voice receptionist — later phase.' },
    { name: 'WhatsApp', plan: 'Professional', available: false, detail: 'Messaging channel — later phase.' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-theo">
          AI Skills Library
        </p>
        <h1 className="mt-1 text-2xl font-bold">Skills for Sophia</h1>
        <p className="mt-1 text-sm text-theo-muted">
          Extra skills stay visible as upgrades. Basic plan skills are enabled.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {skills.map((skill) => (
          <article key={skill.name} className="rounded-3xl bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wide text-theo">
                {skill.plan}
              </p>
              <span
                className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${
                  skill.available ? 'bg-theo-soft text-theo' : 'bg-zinc-100 text-theo-muted'
                }`}
              >
                {skill.available ? 'Included' : 'Upgrade'}
              </span>
            </div>
            <h2 className="mt-3 text-lg font-semibold">{skill.name}</h2>
            <p className="mt-2 text-sm text-theo-muted">{skill.detail}</p>
          </article>
        ))}
      </div>
    </div>
  )
}
