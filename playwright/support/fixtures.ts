import { test as base } from '@playwright/test'

import { createCheckoutActions } from './actions/checkoutActions'
import { createConfiguratorActions } from './actions/configuratorActions'
import { createOrderLockupActions } from './actions/orderLockupActions'
import { createHeroActions } from './actions/heroActions'

import { mockCreditAnalysis } from './mock.api'

type App = {
  checkout: ReturnType<typeof createCheckoutActions>
  configurator: ReturnType<typeof createConfiguratorActions>
  orderLockup: ReturnType<typeof createOrderLockupActions>
  hero: ReturnType<typeof createHeroActions>
  mock: {
    creditAnalysis: (score: number) => Promise<void>
  }
}

export const test = base.extend<{ app: App }>({
  app: async ({ page }, use) => {
    const app: App = {
      checkout: createCheckoutActions(page),
      configurator: createConfiguratorActions(page),
      orderLockup: createOrderLockupActions(page),
      hero: createHeroActions(page),
      mock: {
        creditAnalysis: async (score: number) => await mockCreditAnalysis(page, score),
      }
    }
    await use(app)
  }
})

export { expect } from '@playwright/test'