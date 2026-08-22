export function calculateFurnitureSubtotal(furnitureItems = []) {
    return furnitureItems.reduce(
        (total, item) => total + Number(item.price || 0),
        0
    );
}

export function calculateTotal(subtotal, discount = 0) {
    return Math.max(
        0,
        Number(subtotal) - Number(discount)
    );
}

export function calculateBudgetSummary(
    budget,
    total
) {
    const budgetAmount = Number(budget) || 0;
    const totalAmount = Number(total) || 0;

    const remainingBudget =
        budgetAmount - totalAmount;

    const isOverBudget =
        budgetAmount > 0 &&
        totalAmount > budgetAmount;

    const exceededAmount =
        isOverBudget
            ? totalAmount - budgetAmount
            : 0;

    const budgetUsagePercentage =
        budgetAmount > 0
            ? Math.min((totalAmount / budgetAmount) * 100, 100)
            : 0;

    return {
        budgetAmount,
        remainingBudget,
        isOverBudget,
        exceededAmount,
        budgetUsagePercentage,
    };
}