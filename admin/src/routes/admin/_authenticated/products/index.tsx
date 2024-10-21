import { DashboardLayout } from '@/components/dashboard-layout'
import { PageTitle } from '@/components/page-title'
import { StatsCard } from '@/components/stats-card'
import { Button } from '@/components/ui/button'
import { ProductsTable } from '@/features/products/components/products-table'
import { getProducts } from '@/features/products/services'
import { createFileRoute, Link } from '@tanstack/react-router'
import { DollarSign, Plus, Store, Package } from 'lucide-react'

export const Route = createFileRoute('/admin/_authenticated/products/')({
  component: Page,
})

const breadcrumb = [
  { title: 'Products', url: '/products' },
  { title: 'Products List' },
]

function Page() {
  const products = getProducts()

  return (
    <DashboardLayout breadcrumb={breadcrumb}>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <PageTitle
          title="Products List"
          action={
            <Button asChild>
              <Link to="/admin">
                <Plus className="h-4 w-4" />
                New product
              </Link>
            </Button>
          }
        />
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          <StatsCard title="Total Products" value="50" icon={Package} />
          <StatsCard title="Product Inventory" value="236" icon={Store} />
          <StatsCard title="Average price" value="$248" icon={DollarSign} />
        </div>

        <ProductsTable products={products} />
      </main>
    </DashboardLayout>
  )
}
