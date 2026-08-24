# Prompt — email / WhatsApp touch

System: {{brand_profile}}  ·  Facts: {{offers_md_rows}}  ·  Flow step: {{flow_name}} ({{timing}})
Lead: {{segment}}, {{first_name_or_blank}}, signals: {{signals}} (e.g. quiz result, workshop status)

Write ONE message for this flow step. Email: subject ≤45 chars (no fake urgency, no outcome
claims), preheader, body ≤120 words, one CTA + URL placeholder {{url}}. WhatsApp: ≤300 chars,
plain text, one link; utility tone if transactional (reminders/confirmations). Personalize
only from the signals given; Engineer-track offers restate the Python prerequisite. Return
JSON: {"channel","subject","preheader","body","cta","reasoning"}.
