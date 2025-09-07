import AppLayout from '@/layouts/app-layout';
import foods from '@/routes/foods';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Foods',
        href: foods.index().url,
    },
];

interface Food {
    id: number;
    name: string;
    kcal_per_100g: number;
    carbohydrates_per_100g: number;
    proteins_per_100g: number;
    fats_per_100g: number;
    fiber_per_100g: number;
}

export default function Foods() {

    const { foods: foodsData = [] } = usePage<{ foods: Food[] }>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Foods" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                
                <h1 className="text-2xl font-bold">Foods</h1>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-stone-700">
                        <thead className="bg-gray-50 dark:bg-stone-800">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Kcal/100g</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Carbohydrate/100g</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Protein/100g</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Fat/100g</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Fiber/100g</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 dark:bg-stone-900 dark:divide-stone-700 dark:text-gray-300">
                            {foodsData.map((food) => (
                                <tr key={food.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{food.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{(food as any).name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{(food as any).kcal_per_100g}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{(food as any).carbohydrates_per_100g}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{(food as any).proteins_per_100g}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{(food as any).fats_per_100g}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{(food as any).fiber_per_100g}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </AppLayout>
    );
}
