# Think-Lit Project Structure

## 🏗️ **New File Organization**

### **Components Structure**

```
src/
├── components/
│   ├── ui/                    # Reusable UI components
│   │   ├── Button.tsx        # Button with variants
│   │   ├── Card.tsx          # Card component
│   │   ├── Badge.tsx         # Badge/Tag component
│   │   └── index.ts          # Export all UI components
│   ├── common/               # Common utility components
│   │   ├── LoadingSpinner.tsx # Loading states
│   │   ├── ErrorBoundary.tsx  # Error handling
│   │   └── index.ts          # Export all common components
│   ├── Contents/             # Content-specific components
│   │   ├── TopicCard.tsx     # Topic display card
│   │   ├── Topics.tsx        # Topics list
│   │   ├── CodeExample.tsx   # Code display
│   │   ├── Quiz.tsx          # Quiz component
│   │   └── AnimationBlock.tsx # Animation display
│   └── HomePage/             # Homepage components
│       ├── Banner/
│       ├── Navbar/
│       ├── Footer/
│       └── ...
├── hooks/                    # Custom React hooks
│   └── useTopics.ts         # Topics data management
├── types/                    # TypeScript type definitions
│   └── topic.ts             # Topic-related types
├── utils/                    # Utility functions
│   ├── cn.ts                # Class name utility
│   ├── date.ts              # Date formatting
│   └── difficulty.ts        # Difficulty level utilities
└── styles/                   # Custom CSS
    └── components.css        # Component-specific styles
```

## 🎯 **Key Improvements**

### **1. Reusable UI Components**

- **Button**: Multiple variants (primary, secondary, outline, ghost, danger)
- **Card**: Different styles (default, elevated, outlined) with hover effects
- **Badge**: Consistent tag/badge styling across the app

### **2. Custom Hooks**

- **useTopics**: Centralized topics data management
- **Error handling**: Better error states and retry functionality
- **Loading states**: Consistent loading indicators

### **3. Type Safety**

- **Centralized types**: All interfaces in one place
- **Better type inference**: Improved TypeScript support
- **API consistency**: Unified data structures

### **4. Utility Functions**

- **cn()**: Smart class name merging with Tailwind
- **Date utilities**: Consistent date formatting
- **Difficulty helpers**: Centralized difficulty level logic

### **5. CSS Organization**

- **Component styles**: Reusable CSS classes
- **Tailwind layers**: Proper CSS organization
- **Custom utilities**: Extended Tailwind functionality

## 🚀 **Usage Examples**

### **Importing Components**

```tsx
// Before (scattered imports)
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

// After (clean imports)
import { Button, Card } from "@/components/ui";
```

### **Using Custom Hooks**

```tsx
// Before (inline state management)
const [topics, setTopics] = useState([]);
const [loading, setLoading] = useState(true);

// After (custom hook)
const { topics, loading, error, refetch } = useTopics();
```

### **Type Safety**

```tsx
// Before (inline interfaces)
interface Topic {
  title: string;
  // ... scattered throughout components
}

// After (centralized types)
import { Topic } from "@/types/topic";
```

## 🔧 **Development Workflow**

### **Adding New Components**

1. Create component in appropriate folder (`ui/`, `common/`, etc.)
2. Add to index file for easy imports
3. Use consistent naming and structure
4. Add TypeScript interfaces if needed

### **Styling Guidelines**

1. Use Tailwind CSS classes primarily
2. Add custom CSS only when necessary
3. Follow the established component patterns
4. Use the `cn()` utility for dynamic classes

### **Type Definitions**

1. Keep all types in `src/types/`
2. Use descriptive interface names
3. Export types for reuse across components
4. Maintain consistency with API responses

## 📱 **Responsive Design**

### **Breakpoints**

- **Mobile**: `< 768px`
- **Tablet**: `768px - 1024px`
- **Desktop**: `> 1024px`

### **Grid Systems**

- **Mobile**: Single column
- **Tablet**: 2 columns
- **Desktop**: 3+ columns

## 🎨 **Design System**

### **Colors**

- **Primary**: Blue (#3B82F6)
- **Secondary**: Gray (#6B7280)
- **Success**: Green (#10B981)
- **Warning**: Yellow (#F59E0B)
- **Danger**: Red (#EF4444)

### **Spacing**

- **xs**: 0.25rem (4px)
- **sm**: 0.5rem (8px)
- **md**: 1rem (16px)
- **lg**: 1.5rem (24px)
- **xl**: 2rem (32px)

### **Typography**

- **Headings**: Bold, tight tracking
- **Body**: Regular weight, good readability
- **Links**: Smooth transitions, focus states

## 🚀 **Performance Optimizations**

### **Code Splitting**

- Components are lazy-loaded when possible
- Bundle size optimization
- Tree-shaking friendly exports

### **Image Optimization**

- Next.js Image component usage
- Proper image formats and sizes
- Lazy loading for better performance

### **State Management**

- Local state for component-specific data
- Custom hooks for shared logic
- Minimal re-renders with proper dependencies

## 🔍 **Testing Strategy**

### **Component Testing**

- Unit tests for utility functions
- Component rendering tests
- Hook behavior testing

### **Integration Testing**

- API integration tests
- User flow testing
- Cross-component communication

## 📚 **Documentation**

### **Code Comments**

- Clear component descriptions
- Usage examples in comments
- Type explanations where needed

### **README Files**

- Component usage examples
- API documentation
- Development guidelines

This structure provides a solid foundation for scalable development with better maintainability, reusability, and developer experience.
