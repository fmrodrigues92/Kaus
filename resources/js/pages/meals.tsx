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
    total_kcal: number | null;
    total_carbohydrates: number | null;
    total_proteins: number | null;
    total_fats: number | null;
    total_fiber: number | null;
    total_sodium: number | null;
}

export default function Meals() {

    const { meals: mealsData = [] } = usePage<{ meals: Meal[] }>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Meals" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">

                <div className="mb-4 flex flex-col gap-2">
                    {Object.entries(
                        mealsData.reduce<Record<string, { kcal: number; carb: number; protein: number; fat: number; fiber: number; sodium: number }>>((acc, meal) => {
                            const day = meal.meal_datetime ? meal.meal_datetime.slice(0, 10) : 'Unknown';
                            if (!acc[day]) {
                                acc[day] = { kcal: 0, carb: 0, protein: 0, fat: 0, fiber: 0, sodium: 0 };
                            }
                            acc[day].kcal += meal.total_kcal ?? 0;
                            acc[day].carb += meal.total_carbohydrates ?? 0;
                            acc[day].protein += meal.total_proteins ?? 0;
                            acc[day].fat += meal.total_fats ?? 0;
                            acc[day].fiber += meal.total_fiber ?? 0;
                            acc[day].sodium += meal.total_sodium ?? 0;
                            return acc;
                        }, {})
                    ).map(([day, totals]) => (
                        <div key={day} className="rounded bg-gray-100 dark:bg-stone-800 p-2 text-sm flex flex-wrap">
                            <span className="font-semibold border-r border-zinc-300 px-2">{day}</span>
                            <span className='border-r border-zinc-300 px-2'>Kcal: {totals.kcal}</span>
                            <span className='border-r border-zinc-300 px-2'>Carb: {totals.carb} g</span>
                            <span className='border-r border-zinc-300 px-2'>Protein: {totals.protein} g</span>
                            <span className='border-r border-zinc-300 px-2'>Fat: {totals.fat} g</span>
                            <span className='border-r border-zinc-300 px-2'>Fiber: {totals.fiber} g</span>
                            <span className='px-2'>Sodium: {totals.sodium} mg</span>
                        </div>
                    ))}
                </div>
                
                <h1 className="text-2xl font-bold">Meals</h1>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-stone-700">
                        <thead className="bg-gray-50 dark:bg-stone-800">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Meal Datetime</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Kcal</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Carb</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Protein</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Fat</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Fiber</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Sodium</th>

                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 dark:bg-stone-900 dark:divide-stone-700 dark:text-gray-300">
                            {mealsData.map((meal) => (
                                <tr key={meal.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{meal.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{meal.meal_datetime}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{meal.total_kcal}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{meal.total_carbohydrates}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{meal.total_proteins}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{meal.total_fats}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{meal.total_fiber}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{meal.total_sodium}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </AppLayout>
    );
}
