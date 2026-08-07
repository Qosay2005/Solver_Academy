import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const savedLanguage = typeof window !== 'undefined' ? localStorage.getItem('appLang') : 'en';

const resources = {
  en: {
    translation: {
      navbar: {
        home: 'Home',
        courses: 'Courses',
        register: 'Register',
        cart: 'Cart',
        login: 'Login',
        logout: 'Logout',
      },
      cart: {
        title: 'Your Cart',
        subtitle: 'Review the items you have added and continue with your order.',
        clear: 'Clear Cart',
        empty: 'Your cart is empty right now.',
        continueShopping: '← Continue Shopping',
        remove: 'Remove',
        quantity: 'Quantity',
        orderSummary: 'Order Summary',
        subtotal: 'Subtotal',
        tax: 'Tax',
        promotion: 'Promotion',
        total: 'Total',
        coupon: 'Coupon Code',
        apply: 'Apply',
        checkout: 'Proceed to Checkout →',
        secure: 'Secure checkout',
      },
      product: {
        addToCart: 'Add to Cart',
        count: 'Count',
      },
      common: {
        retry: 'Retry',
      },
    },
  },
  ar: {
    translation: {
      navbar: {
        home: 'الرئيسية',
        courses: 'الدورات',
        register: 'إنشاء حساب',
        cart: 'السلة',
        login: 'تسجيل الدخول',
        logout: 'تسجيل الخروج',
      },
      cart: {
        title: 'سلة التسوق',
        subtitle: 'راجع العناصر التي أضفتها وواصل طلبك.',
        clear: 'تفريغ السلة',
        empty: 'سلة التسوق فارغة حالياً.',
        continueShopping: '← متابعة التسوق',
        remove: 'إزالة',
        quantity: 'الكمية',
        orderSummary: 'ملخص الطلب',
        subtotal: 'الإجمالي الفرعي',
        tax: 'الضريبة',
        promotion: 'العرض',
        total: 'الإجمالي',
        coupon: 'رمز القسيمة',
        apply: 'تطبيق',
        checkout: 'متابعة الدفع ←',
        secure: 'دفع آمن',
      },
      product: {
        addToCart: 'أضف إلى السلة',
        count: 'الكمية',
      },
      common: {
        retry: 'إعادة المحاولة',
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: savedLanguage || 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
