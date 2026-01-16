import { Text, type TextProps } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';

type FontFamily = 'inter' | 'poppins' | 'scheherazade';
type FontWeight = 'regular' | 'medium' | 'semiBold' | 'bold';

const fontFamilyMap: Record<FontFamily, Record<FontWeight, string>> = {
    inter: {
        regular: 'Inter_400Regular',
        medium: 'Inter_400Regular',
        semiBold: 'Inter_400Regular',
        bold: 'Inter_700Bold',
    },
    poppins: {
        regular: 'Poppins_400Regular',
        medium: 'Poppins_500Medium',
        semiBold: 'Poppins_600SemiBold',
        bold: 'Poppins_700Bold',
    },
    scheherazade: {
        regular: 'ScheherazadeNew_400Regular',
        medium: 'ScheherazadeNew_400Regular',
        semiBold: 'ScheherazadeNew_400Regular',
        bold: 'ScheherazadeNew_700Bold',
    },
};

export type ThemedTextProps = TextProps & {
    lightColor?: string;
    darkColor?: string;
    type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
    fontFamily?: FontFamily;
    fontWeight?: FontWeight;
};

export function ThemedText({ style, lightColor, darkColor, type = 'default', fontFamily = 'inter', fontWeight, ...rest }: ThemedTextProps) {
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

    // Determine font weight based on type if not explicitly provided
    let finalFontWeight: FontWeight = fontWeight || 'regular';
    if (!fontWeight) {
        switch (type) {
            case 'title':
            case 'subtitle':
                finalFontWeight = 'bold';
                break;
            case 'defaultSemiBold':
                finalFontWeight = 'semiBold';
                break;
            default:
                finalFontWeight = 'regular';
        }
    }

    const fontFamilyName = fontFamilyMap[fontFamily]?.[finalFontWeight] || fontFamilyMap.inter.regular;

    return <Text style={[{ color, fontFamily: fontFamilyName }, style]} {...rest} />;
}
