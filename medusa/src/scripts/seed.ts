// Seed: minimal local-dev catalog for the InfraSync storefront.
// Creates: publishable API key (+sales-channel link), INR region, 3 product
// categories, and 3 CLEARLY FAKE sample products (one per category).
// products run: npm run seed  (idempotent-ish: re-run creates duplicates; dev only)
import { ExecArgs } from "@medusajs/framework/types";
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils";
import {
  createProductCategoriesWorkflow,
  createProductsWorkflow,
  createRegionsWorkflow,
} from "@medusajs/medusa/core-flows";

export default async function seed({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const salesChannelService = container.resolve(Modules.SALES_CHANNEL) as any;
  const apiKeyService = container.resolve(Modules.API_KEY) as any;
  const fulfillmentService = container.resolve(Modules.FULFILLMENT) as any;
  const link = container.resolve(ContainerRegistrationKeys.LINK) as any;

  // 1. Default sales channel
  let [salesChannel] = await salesChannelService.listSalesChannels({}, { take: 1 });
  if (!salesChannel) {
    salesChannel = await salesChannelService.createSalesChannels({
      name: "Default Sales Channel",
    });
  }
  logger.info(`sales channel: ${salesChannel.id}`);

  // 2. Publishable API key linked to the sales channel
  const publishable = await apiKeyService.createApiKeys({
    title: "Web storefront",
    type: "publishable",
    created_by: "seed-script",
  });
  await link.create({
    [Modules.API_KEY]: { publishable_key_id: publishable.id },
    [Modules.SALES_CHANNEL]: { sales_channel_id: salesChannel.id },
  });
  // Print ONLY the token id — it's a public-by-design key, but keep it tidy:
  logger.info(`PUBLISHABLE_KEY=${publishable.token}`);

  // 3. Region: India / INR
  const { result: regions } = await createRegionsWorkflow(container).run({
    input: {
      regions: [
        {
          name: "India",
          currency_code: "inr",
          countries: ["in"],
          payment_providers: [],
        },
      ],
    },
  });
  logger.info(`region: ${regions[0]?.id}`);

  // 4. Default shipping profile (auto-created by fulfillment module)
  const [shippingProfile] = await fulfillmentService.listShippingProfiles({}, { take: 1 });

  // 5. Categories
  const { result: categories } = await createProductCategoriesWorkflow(container).run({
    input: {
      product_categories: [
        { name: "Clothing", handle: "clothing", is_active: true },
        { name: "Footwear", handle: "footwear", is_active: true },
        { name: "Bags & Accessories", handle: "bags-accessories", is_active: true },
      ],
    },
  });
  const cat = Object.fromEntries(categories.map((c: any) => [c.handle, c.id]));

  // 6. Sample products — clearly fake, never for production
  const samples = [
    {
      title: "Sample Tee — DO NOT PUBLISH",
      handle: "sample-tee",
      category_id: cat["clothing"],
      description: "[[PRODUCT_DESCRIPTION]] — placeholder until agent/offers.md is filled.",
    },
    {
      title: "Sample Sneaker — DO NOT PUBLISH",
      handle: "sample-sneaker",
      category_id: cat["footwear"],
      description: "[[PRODUCT_DESCRIPTION]] — placeholder.",
    },
    {
      title: "Sample Backpack — DO NOT PUBLISH",
      handle: "sample-backpack",
      category_id: cat["bags-accessories"],
      description: "[[PRODUCT_DESCRIPTION]] — placeholder.",
    },
  ];

  for (const s of samples) {
    const { result } = await createProductsWorkflow(container).run({
      input: {
        products: [
          {
            title: s.title,
            handle: s.handle,
            description: s.description,
            status: "published",
            shipping_profile_id: shippingProfile?.id,
            category_ids: [s.category_id],
            options: [{ title: "Size", values: ["S", "M", "L"] }],
            variants: [
              {
                title: "S",
                options: { Size: "S" },
                prices: [{ amount: 99900, currency_code: "inr" }], // ₹999 placeholder
              },
              {
                title: "M",
                options: { Size: "M" },
                prices: [{ amount: 99900, currency_code: "inr" }],
              },
            ],
            sales_channels: [{ id: salesChannel.id }],
          },
        ],
      },
    });
    logger.info(`product: ${result[0].id} — ${s.title}`);
  }

  logger.info("seed complete");
}
