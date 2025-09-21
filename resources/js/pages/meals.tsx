import AppLayout from '@/layouts/app-layout';
import meals from '@/routes/meals';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { usePage, router } from '@inertiajs/react';
import { useEffect, useState } from "react";
import { useMemo } from "react";

import { Bar } from "react-chartjs-2";
import { Chart as ChartJS,
            BarElement,
            CategoryScale,
            LinearScale,
            Tooltip,
            Legend,
        } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Meals',
        href: meals.index().url,
    },
];

interface Food {
    id: number;
    name: string;
    kcal_per_100g: number;
    carbohydrates_per_100g: number;
    proteins_per_100g: number;
    fats_per_100g: number;
    fiber_per_100g?: number;
    sodium_per_100g?: number;
}

interface MealItem {
    id: number;
    food: Food;        // não apenas food_id
    quantity: number;
}

interface Meal {
    id: number;
    user_id: number;
    name: string;
    meal_datetime: string | null;
    createdAt: string | null;
    updatedAt: string | null;
    mealItems: MealItem[]; // camelCase igual backend
    total_kcal?: number;
    total_carbohydrates?: number;
    total_proteins?: number;
    total_fats?: number;
    total_fiber?: number;
    total_sodium?: number;
}

export default function Meals() {

    const { meals: mealsData = [] } = usePage<{ meals: Meal[] }>().props;
    const { foods: foodsData = [] } = usePage<{ foods: Food[] }>().props;

    const [days, setDays] = useState<number>(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMeal, setSelectedMeal] = useState<Meal>({
        id: 0,
        user_id: 0,
        name: '',
        meal_datetime: null,
        createdAt: null,
        updatedAt: null,
        mealItems: []
    });

    // On component mount, read the 'days' parameter from the URL
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const daysParam = params.get('days');
        if (daysParam) {
            setDays(Number(daysParam));
        } else {
            setDays(0);
        }
    }, []);

    //filter days function
    function filterDaysUrlParam(days: number): string {
        setDays(days);
        const url = days > 0 ? `${meals.index().url}?days=${days}` : meals.index().url;
        router.get(url, {}, { preserveState: true, preserveScroll: true });
        return url;
    }


    function closeModal() {
        setIsModalOpen(false);
    }
    function openModal(meal: Meal) {
        
        setSelectedMeal({
            ...meal
        });

        setIsModalOpen(true);
    }


    function handleSave(e: React.FormEvent) {
        e.preventDefault(); // impede o refresh

        if (selectedMeal.id === 0) {
            const mealToSend = {
                ...selectedMeal,
                mealItems: selectedMeal.mealItems.map(item => ({
                    id: item.id,
                    food_id: item.food.id,
                    quantity: item.quantity
                }))
            };

            router.post(meals.store().url, { meal: mealToSend }, {
                preserveScroll: true,
                onSuccess: () => {
                    closeModal();
                }
            });
        } else {
            // router.put(meals.update(selectedMeal.id).url, selectedMeal);
        }
    }

    const dailyTotals = useMemo(() => {
        return mealsData.reduce<Record<string, { kcal: number; carb: number; protein: number; fat: number; fiber: number; sodium: number }>>((acc, meal) => {
            const day = meal.meal_datetime ? meal.meal_datetime.slice(0, 10) : 'Unknown';
            if (!acc[day]) {
                acc[day] = { kcal: 0, carb: 0, protein: 0, fat: 0, fiber: 0, sodium: 0 };
            }
            acc[day].kcal += Math.round(meal.mealItems.reduce((sum, item) => sum + ((item.food.kcal_per_100g * item.quantity) ?? 0), 0));
            acc[day].carb += Math.round(meal.mealItems.reduce((sum, item) => sum + ((item.food.carbohydrates_per_100g * item.quantity) ?? 0), 0));
            acc[day].protein += Math.round(meal.mealItems.reduce((sum, item) => sum + ((item.food.proteins_per_100g * item.quantity) ?? 0), 0));
            acc[day].fat += Math.round(meal.mealItems.reduce((sum, item) => sum + ((item.food.fats_per_100g * item.quantity) ?? 0), 0));
            acc[day].fiber += Math.round(meal.mealItems.reduce((sum, item) => sum + ((item.food.fiber_per_100g * item.quantity) ?? 0), 0));
            acc[day].sodium += Math.round(meal.mealItems.reduce((sum, item) => sum + ((item.food.sodium_per_100g * item.quantity) ?? 0), 0));
            return acc;
        }, {});
    }, [mealsData]);

    const chartLabels = Object.keys(dailyTotals).sort();
    const chartData = {
        labels: chartLabels,
        datasets: [
            {
                label: "Kcal",
                data: chartLabels.map(day => dailyTotals[day].kcal),
                backgroundColor: "rgba(59, 130, 246, 0.7)",
            },
            {
                label: "Carb (g)",
                data: chartLabels.map(day => dailyTotals[day].carb),
                backgroundColor: "rgba(16, 185, 129, 0.7)",
            },
            {
                label: "Protein (g)",
                data: chartLabels.map(day => dailyTotals[day].protein),
                backgroundColor: "rgba(234, 179, 8, 0.7)",
            },
            {
                label: "Fat (g)",
                data: chartLabels.map(day => dailyTotals[day].fat),
                backgroundColor: "rgba(239, 68, 68, 0.7)",
            },
            {
                label: "Fiber (g)",
                data: chartLabels.map(day => dailyTotals[day].fiber),
                backgroundColor: "rgba(168, 85, 247, 0.7)",
            },
            {
                label: "Sodium (mg)",
                data: chartLabels.map(day => dailyTotals[day].sodium),
                backgroundColor: "rgba(59, 130, 246, 0.3)",
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { position: "top" as const },
            tooltip: { mode: "index", intersect: false },
        },
        scales: {
            x: { stacked: true },
            y: { stacked: false, beginAtZero: true },
        },
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Meals" />

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75">
                    <div className="bg-white dark:bg-stone-900 rounded-lg shadow-lg p-6 w-3/4 relative opacity-100">
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                            onClick={closeModal}
                            aria-label="Close"
                        >
                            &times;
                        </button>
                        <div className="space-y-2 text-sm ">
                            {selectedMeal.id ? (
                                <h1 className="text-lg font-semibold">Edit Meal</h1>
                            ) : (
                                <h1 className="text-lg font-semibold">New Meal</h1>
                            )}
                            <hr />
                            <form>
                                <div className="flex space-x-4">
                                    <div className="w-1/2">
                                        <label className="block text-sm font-medium mb-1" htmlFor="meal-name">Meal Name</label>
                                        <input
                                            type="text"
                                            id="meal-name"
                                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-stone-800 dark:border-stone-700 dark:text-gray-300"
                                            value={selectedMeal.name}
                                            onChange={(e) => setSelectedMeal({ ...selectedMeal, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="w-1/2">
                                        <label className="block text-sm font-medium mb-1" htmlFor="meal-datetime">Meal Datetime</label>
                                        <input
                                            type="datetime-local"
                                            id="meal-datetime"
                                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-stone-800 dark:border-stone-700 dark:text-gray-300"
                                            value={selectedMeal.meal_datetime ?? ''}
                                            onChange={(e) => setSelectedMeal({ ...selectedMeal, meal_datetime: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="mt-10 flex flex-col">
                                    {selectedMeal.mealItems.map((item, idx) => (
                                        <div key={idx} className="flex space-x-4 w-full mb-2">
                                            <div className="w-1/2">
                                                <label className="block text-sm font-medium mb-1" htmlFor={`food-item-${idx}`}>Food Item</label>
                                                <select
                                                    className="w-full border border-gray-300 rounded text-sm px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-stone-800 dark:border-stone-700 dark:text-gray-300"
                                                    id={`food-item-${idx}`}
                                                    value={item.food.id ?? ''}
                                                    onChange={(e) => {
                                                        const foodId = Number(e.target.value);
                                                        const food = foodsData.find(f => f.id === foodId);
                                                        if (food) {
                                                            const updatedItems = [...selectedMeal.mealItems];
                                                            updatedItems[idx] = { ...updatedItems[idx], food };
                                                            setSelectedMeal({ ...selectedMeal, mealItems: updatedItems });
                                                        }
                                                    }}
                                                >
                                                    <option value="">Select a food item...</option>
                                                    {foodsData.map(food => (
                                                        <option key={food.id} value={food.id}>{food.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="w-1/2">
                                                <label className="block text-sm font-medium mb-1" htmlFor={`quantity-in-grams-${idx}`}>Quantity (portion)</label>
                                                <input
                                                    type="number"
                                                    id={`quantity-in-grams-${idx}`}
                                                    className="w-full border border-gray-300 rounded text-sm px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-stone-800 dark:border-stone-700 dark:text-gray-300"
                                                    min={0}
                                                    step={0.05}
                                                    max={10}
                                                    value={item.quantity ?? ''}
                                                    onChange={(e) => {
                                                        const quantity = Number(e.target.value);
                                                        const updatedItems = [...selectedMeal.mealItems];
                                                        updatedItems[idx] = { ...updatedItems[idx], quantity };
                                                        setSelectedMeal({ ...selectedMeal, mealItems: updatedItems });
                                                    }}
                                                />
                                            </div>
                                            <div className="flex items-end">
                                                <button
                                                    type="button"
                                                    className="mb-1 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                                                    onClick={() => {
                                                        const updatedItems = selectedMeal.mealItems.filter((_, i) => i !== idx);
                                                        setSelectedMeal({ ...selectedMeal, mealItems: updatedItems });
                                                    }}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="mt-2 w-full">
                                        <button
                                            type="button"
                                            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            onClick={() => setSelectedMeal({ 
                                                ...selectedMeal, 
                                                mealItems: [...selectedMeal.mealItems, { id: 0, food: { id: 0, name: '', kcal_per_100g: 0, carbohydrates_per_100g: 0, proteins_per_100g: 0, fats_per_100g: 0 }, quantity: 1 }] 
                                            })}
                                        >
                                            Add Food Item
                                        </button>
                                    </div>
                                </div>
                                <div className="my-4">
                                    <hr />    
                                </div>
                                <div className="mt-6 text-right">
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2"
                                        onClick={handleSave}
                                    >
                                        Save
                                    </button>
                                    <button
                                        type="button"
                                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
                                        onClick={closeModal}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="mt-4 text-right">
                        </div>
                    </div>
                </div>
            )}

            <div className="m-4 flex items-center gap-2">
                <label htmlFor="select-days" className="text-sm font-medium">Show days:</label>
                <select
                    id="select-days"
                    className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-stone-800 dark:border-stone-700 dark:text-gray-300"
                    value={days}
                    onChange={e => filterDaysUrlParam(Number(e.target.value))}
                >
                    <option value={0}>All</option>
                    <option value={7}>Last 7 days</option>
                    <option value={15}>Last 15 days</option>
                    <option value={30}>Last 30 days</option>
                </select>
            </div>

            <div className="mx-4 mb-8">
                <h2 className="text-lg font-semibold mb-2">Daily Nutrition Chart</h2>
                <div className="bg-white dark:bg-stone-900 rounded-lg p-4 shadow">
                    <Bar data={chartData} options={chartOptions} />
                </div>
            </div>

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">

                <div className="mb-4 flex flex-col gap-2">
                    {Object.entries(
                        mealsData.reduce<Record<string, { kcal: number; carb: number; protein: number; fat: number; fiber: number; sodium: number }>>((acc, meal) => {
                            const day = meal.meal_datetime ? meal.meal_datetime.slice(0, 10) : 'Unknown';
                            if (!acc[day]) {
                                acc[day] = { kcal: 0, carb: 0, protein: 0, fat: 0, fiber: 0, sodium: 0 };
                            }
                            acc[day].kcal += Math.round(meal.mealItems.reduce((sum, item) => sum + ((item.food.kcal_per_100g * item.quantity) ?? 0), 0));
                            acc[day].carb += Math.round(meal.mealItems.reduce((sum, item) => sum + ((item.food.carbohydrates_per_100g * item.quantity) ?? 0), 0));
                            acc[day].protein += Math.round(meal.mealItems.reduce((sum, item) => sum + ((item.food.proteins_per_100g * item.quantity) ?? 0), 0));
                            acc[day].fat += Math.round(meal.mealItems.reduce((sum, item) => sum + ((item.food.fats_per_100g * item.quantity) ?? 0), 0));
                            acc[day].fiber += Math.round(meal.mealItems.reduce((sum, item) => sum + ((item.food.fiber_per_100g * item.quantity) ?? 0), 0));
                            acc[day].sodium += Math.round(meal.mealItems.reduce((sum, item) => sum + ((item.food.sodium_per_100g * item.quantity) ?? 0), 0));
  
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
                
                <div className="mb-4 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Meals</h1>
                        <p className="text-gray-600 dark:text-gray-400">Click on a meal name to view/edit details.</p>
                    </div>
                    <div className="mt-4">
                        <button
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onClick={() => openModal({
                                id: 0,
                                user_id: 0,
                                name: '',
                                meal_datetime: null,
                                createdAt: null,
                                updatedAt: null,
                                mealItems: []
                            })}
                        >
                            New Meal
                        </button>
                    </div>
                </div>
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
                            {mealsData.map((meal) => {
                                const totalKcal = Math.round(meal.mealItems.reduce((sum, item) => sum + (item.food.kcal_per_100g * item.quantity), 0));
                                const totalCarb = Math.round(meal.mealItems.reduce((sum, item) => sum + (item.food.carbohydrates_per_100g * item.quantity), 0));
                                const totalProtein = Math.round(meal.mealItems.reduce((sum, item) => sum + (item.food.proteins_per_100g * item.quantity), 0));
                                const totalFat = Math.round(meal.mealItems.reduce((sum, item) => sum + (item.food.fats_per_100g * item.quantity), 0));
                                const totalFiber = Math.round(meal.mealItems.reduce((sum, item) => sum + (item.food.fiber_per_100g * item.quantity), 0));
                                const totalSodium = Math.round(meal.mealItems.reduce((sum, item) => sum + (item.food.sodium_per_100g * item.quantity), 0));

                                return (
                                    <tr key={meal.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm cursor-pointer text-cyan-800" onClick={() => openModal(meal)}>{meal.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">{meal.meal_datetime}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">{totalKcal}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">{totalCarb}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">{totalProtein}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">{totalFat}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">{totalFiber}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">{totalSodium}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

            </div>
        </AppLayout>
    );
}
