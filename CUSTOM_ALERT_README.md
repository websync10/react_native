# Custom Alert System

This document explains how to use the new custom alert system to replace the default `Alert.alert` throughout the app for better UI and user experience.

## Components

### 1. CustomAlert Component (`components/CustomAlert.tsx`)
A modern, visually appealing alert component with:
- Different types: success, error, warning, info
- Custom icons and colors for each type
- Smooth animations
- Better typography and spacing
- Support for confirmation dialogs

### 2. useCustomAlert Hook (`lib/utils/customAlert.ts`)
A custom hook that provides easy-to-use functions for showing different types of alerts.

## Usage

### Basic Setup

```tsx
import CustomAlert from '@/components/CustomAlert';
import { useCustomAlert } from '@/lib/utils/customAlert';

const MyComponent = () => {
  const { alertState, showSuccess, showError, showInfo, showWarning, showConfirmation, hideAlert } = useCustomAlert();

  return (
    <View>
      {/* Your component content */}
      
      <CustomAlert
        visible={alertState.visible}
        title={alertState.title}
        message={alertState.message}
        type={alertState.type}
        onClose={hideAlert}
        onConfirm={alertState.onConfirm}
        confirmText={alertState.confirmText}
        cancelText={alertState.cancelText}
        showCancel={alertState.showCancel}
      />
    </View>
  );
};
```

### Alert Types

#### Success Alert
```tsx
showSuccess('Success!', 'Operation completed successfully');
```

#### Error Alert
```tsx
showError('Error', 'Something went wrong. Please try again.');
```

#### Warning Alert
```tsx
showWarning('Warning', 'Please check your input and try again.');
```

#### Info Alert
```tsx
showInfo('Information', 'Here is some important information.');
```

#### Confirmation Dialog
```tsx
showConfirmation(
  'Confirm Action',
  'Are you sure you want to proceed?',
  () => {
    // Action to perform on confirmation
    console.log('Confirmed!');
  },
  'Yes',
  'No'
);
```

## Migration Guide

### Replace Alert.alert with Custom Alerts

#### Before (Old Alert.alert):
```tsx
Alert.alert('Error', 'Something went wrong');
```

#### After (Custom Alert):
```tsx
showError('Error', 'Something went wrong');
```

#### Before (Confirmation):
```tsx
Alert.alert(
  'Confirm',
  'Are you sure?',
  [
    { text: 'Cancel', style: 'cancel' },
    { text: 'OK', onPress: () => doSomething() }
  ]
);
```

#### After (Custom Confirmation):
```tsx
showConfirmation(
  'Confirm',
  'Are you sure?',
  () => doSomething(),
  'OK',
  'Cancel'
);
```

## Benefits

1. **Better Visual Design**: Modern, consistent UI across the app
2. **Improved UX**: Clear visual feedback with icons and colors
3. **Accessibility**: Better contrast and readability
4. **Consistency**: Unified alert system throughout the app
5. **Customization**: Easy to modify styles and behavior
6. **Type Safety**: Full TypeScript support

## Implementation Status

- ✅ CustomAlert component created
- ✅ useCustomAlert hook created
- ✅ Example implementation in editProfile.tsx
- 🔄 Migration of other components in progress

## Next Steps

To complete the migration, replace all remaining `Alert.alert` calls in:
- `components/onboarding/`
- `components/Auth.tsx`
- `components/ProfileForm.tsx`
- `components/home/Sidebar.tsx`
- `components/home/LogoutUser.tsx`
- `app/(auth)/login.tsx`
- `app/pages/createPost.tsx`
- `app/pages/help-support.tsx`
- And other components...

## Notes

- The custom alert system maintains the same functionality as `Alert.alert`
- All existing alert calls can be easily migrated
- The system is backward compatible and can be gradually adopted
- Custom styling can be easily modified in the `CustomAlert.tsx` component
