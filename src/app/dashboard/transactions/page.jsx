export default function TransactionsPage() {
    // ✅ Fake Data for Transactions
    const transactions = [
      { id: 1, name: "Salary", amount: 5000, type: "Income" },
      { id: 2, name: "Grocery", amount: -200, type: "Expense" },
      { id: 3, name: "Freelance", amount: 1500, type: "Income" },
      { id: 4, name: "Electric Bill", amount: -100, type: "Expense" },
    ];
  
    return (
      <div>
        <h1 className="text-2xl font-bold">All Transactions</h1>
        <ul className="mt-4 space-y-2">
          {transactions.map((tx) => (
            <li key={tx.id} className="p-2 border rounded bg-white shadow-sm">
              <span className="font-semibold">{tx.name}</span> 
              <span className={`ml-2 ${tx.amount > 0 ? "text-green-600" : "text-red-600"}`}>
                ${tx.amount}
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  