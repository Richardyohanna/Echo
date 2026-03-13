import { StyleSheet } from "react-native"
import { fontFamilyType, fontSizeType } from "./textSet"
import { colorType } from "./colorSet"

export const Row_and_Center = StyleSheet.create({

    row_and_center: {
        flexDirection: "row", 
        justifyContent: "center", 
        alignItems: "center"
    },
    with_gap: {
        gap: 10,
    }

})

export const NormalText = StyleSheet.create({

    normal: {
        fontFamily: fontFamilyType.interMedium,
        fontSize: fontSizeType.base,
        color: colorType.contentText
    }
})


export const Column_and_Center = StyleSheet.create({

    column_and_center : {
        flexDirection: "column",
        justifyContent:"center",
        alignItems: "center"
    }
})