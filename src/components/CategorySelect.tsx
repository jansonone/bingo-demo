import { CategoryId } from '../types';
import { CATEGORIES } from '../data/categories';
import { Card } from './ui/Card';
import { Button } from './ui/Button';

interface Props {
  onSelect: (categoryId: CategoryId) => void;
  onBack: () => void;
}

export function CategorySelect({ onSelect, onBack }: Props) {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Button variant="ghost" size="sm" onClick={onBack}>
            ← Back
          </Button>
          <h2 className="text-2xl font-bold text-gray-900">
            Choose Your Category
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {CATEGORIES.map(category => (
            <Card
              key={category.id}
              hover
              onClick={() => onSelect(category.id)}
            >
              <div className="text-center">
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  {category.description}
                </p>
                <div className="flex flex-wrap gap-1 justify-center mb-3">
                  {category.words.slice(0, 6).map(word => (
                    <span
                      key={word}
                      className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
                    >
                      {word}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-gray-400">
                  {category.words.length} buzzwords
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
