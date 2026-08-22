import "./CostSummary.css";

export default function CostSummary({
    furnitureCount,
    subtotal,
    discount = 0,
    total,

    budget,
    onBudgetChange,

    remainingBudget,
    budgetUsagePercentage,

    isOverBudget,
    exceededAmount,
}) {
    const formatPrice = (value) =>
        value.toLocaleString("tr-TR");

    return (
        <div className="cost-summary-wrapper">
            <section className="cost-summary">
                <div className="cost-summary__title">
                    <h2>Maliyet Özeti</h2>
                </div>

                <div className="cost-summary__item">
                    <span>Mobilya Adedi</span>
                    <strong>{furnitureCount}</strong>
                </div>

                <div className="cost-summary__item">
                    <span>Ara Toplam</span>
                    <strong>
                        {formatPrice(subtotal)} TL
                    </strong>
                </div>

                <div className="cost-summary__item">
                    <span>İndirim</span>
                    <strong>
                        {formatPrice(discount)} TL
                    </strong>
                </div>

                <div className="cost-summary__item cost-summary__item--total">
                    <span>Toplam Tutar</span>
                    <strong>
                        {formatPrice(total)} TL
                    </strong>
                </div>
            </section>

            <section className="budget-summary">
                <div className="budget-summary__header">
                    <h3>Bütçe Takibi</h3>

                    <div className="budget-summary__input-wrapper">
                        <label htmlFor="design-budget">
                            Maksimum Bütçe
                        </label>

                        <div className="input-group">
                            <input
                                id="design-budget"
                                type="number"
                                min="0"
                                className="form-control"
                                placeholder="Örn. 50000"
                                value={budget}
                                onChange={(event) =>
                                    onBudgetChange(
                                        event.target.value
                                    )
                                }
                            />

                            <span className="input-group-text">
                                TL
                            </span>
                        </div>
                    </div>
                </div>

                {Number(budget) > 0 && (
                    <>
                        <div className="budget-summary__details">
                            <div>
                                <span>Belirlenen Bütçe</span>
                                <strong>
                                    {formatPrice(
                                        Number(budget)
                                    )} TL
                                </strong>
                            </div>

                            <div>
                                <span>Harcanan</span>
                                <strong>
                                    {formatPrice(total)} TL
                                </strong>
                            </div>

                            <div>
                                <span>
                                    {isOverBudget
                                        ? "Bütçe Aşımı"
                                        : "Kalan Bütçe"}
                                </span>

                                <strong>
                                    {formatPrice(
                                        isOverBudget
                                            ? exceededAmount
                                            : remainingBudget
                                    )} TL
                                </strong>
                            </div>

                            <div>
                                <span>Kullanım</span>

                                <strong>
                                    {Math.round(
                                        budgetUsagePercentage
                                    )}%
                                </strong>
                            </div>
                        </div>

                        <div
                            className="progress"
                            role="progressbar"
                            aria-label="Bütçe kullanım oranı"
                            aria-valuenow={
                                budgetUsagePercentage
                            }
                            aria-valuemin="0"
                            aria-valuemax="100"
                        >
                            <div
                                className={
                                    isOverBudget
                                        ? "progress-bar bg-danger"
                                        : "progress-bar"
                                }
                                style={{
                                    width: `${budgetUsagePercentage}%`,
                                }}
                            />
                        </div>

                        {isOverBudget && (
                            <div
                                className="alert alert-danger mt-3 mb-0"
                                role="alert"
                            >
                                Bütçenizi{" "}
                                <strong>
                                    {formatPrice(
                                        exceededAmount
                                    )} TL
                                </strong>{" "}
                                aştınız.
                            </div>
                        )}
                    </>
                )}
            </section>
        </div>
    );
}