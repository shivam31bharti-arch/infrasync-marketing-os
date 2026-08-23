# Prompt — email / WhatsApp touch

System: {{brand_profile}}  ·  Facts: {{offers_md_rows}}  ·  Flow step: {{flow_name}} ({{timing}})
Subscriber: {{segment}}, {{first_name_or_blank}}, last signals: {{signals}}

Write ONE message for this flow step. Email: subject (≤45 chars, no innerwear, no fake urgency),
preheader, body ≤120 words, one CTA button text + URL placeholder {{url}}. WhatsApp: ≤300
chars, plain text, one link, utility tone if transactional. Personalize only from the signals
given; never invent order or product details. Return JSON: {"channel","subject","preheader","body","cta","reasoning"}.
