'use client';

const CategorySelector = ({ categories, selectedCategoryId, setSelectedCategoryId }) => {
  return (
    <div className="flex justify-center my-6">
      {categories.length > 1 && (
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((cat) => (
            <button
              key={cat._id}
              className={`w-40 min-w-[10rem] text-center px-4 py-2 rounded-sm text-xl shadow-xs font-black uppercase transition duration-500 scale-90 ${
                selectedCategoryId === cat._id
                  ? 'bg-primary text-light scale-100 shadow-lg shadow-primary/30 '
                  : 'bg-primary/10 text-dark'
              }`}
              onClick={() => setSelectedCategoryId(cat._id)}
            >
              {cat.title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategorySelector;
