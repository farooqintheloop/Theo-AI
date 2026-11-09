import { DocumentLayout } from '@/components/layout/DocumentLayout'

export function PrivacyPage() {
  return (
    <DocumentLayout title="Privacy Policy">
      <p>
        Placeholder policy for THEO AI. Replace this text with the product
        owner’s final copy before launch.
      </p>
      <p>
        THEO stores owner account details, business information, AI employee
        configuration, knowledge you enter, chat transcripts, and enquiries so
        we can provide the receptionist service.
      </p>
      <p>
        Website visitors who use the chat widget do not create an account. Their
        messages and any contact details they share are stored for that business
        only.
      </p>
      <p>
        We do not store payment card numbers. Stripe processes payments. We do
        not sell customer chat data.
      </p>
      <p>Questions about this policy should go to the product owner.</p>
    </DocumentLayout>
  )
}
