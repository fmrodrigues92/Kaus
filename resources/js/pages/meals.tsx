import AppLayout from '@/layouts/app-layout';
import meals from '@/routes/meals';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Meals',
        href: meals.index().url,
    },
];

interface Meal {
    id: number;
    user_id: number;
    name: string;
    meal_datetime: string | null;
    createdAt: string | null;
    updatedAt: string | null;
}

export default function Meals() {

    const { meals: mealsData = [] } = usePage<{ meals: Meal[] }>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Meals" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                
                <h1 className="text-2xl font-bold">Meals</h1>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-stone-700">
                        <thead className="bg-gray-50 dark:bg-stone-800">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">User ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Meal Datetime</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 dark:bg-stone-900 dark:divide-stone-700 dark:text-gray-300">
                            {mealsData.map((meal) => (
                                <tr key={meal.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{meal.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{meal.user_id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{meal.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{meal.meal_datetime}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </AppLayout>
    );
}
