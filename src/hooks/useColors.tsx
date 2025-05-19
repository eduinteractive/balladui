
import { useContext } from "react";
import { BalladContext } from "../BalladUIProvider";

export const useColors = () => {
    const context = useContext(BalladContext);
    if (context === undefined) {
        throw new Error('useColors must be used within a BalladUIProvider');
    }
    return {
        colors: context.theme.colors,
        primaryShade: context.theme.primaryShade
    }
}