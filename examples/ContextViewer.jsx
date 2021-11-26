import React from 'react'
import { StepItem } from './model/StepItem'
import { TransformMode, TranslationMode} from "./model/CommonSetting"
import documentManager from "./model/DocumentManager"

export const contextViewer = {
    default: {
        documentManager,

        slider: {
            upperScan: 100,
            lowerScan: 100,
            upperCrown: 100,
            lowerCrown: 100,
            upperGingival: 100,
            lowerGingival: 100,
            waxrimScan: 100,
            occlusalScan: 100,
        },

        process: {
            step: "준비",
            // transformMode: TransformMode.NONE,
            // translationMode: TranslationMode.NONE
        },
        /** StepItem name 과 동일하게 설정 */
        leftToolbar: [
            //  class로 정으해서 설정하는게 좋을듯??
            // name is css className for style
            new StepItem({
                name: "occlusalplane",
                descript: "Occlusal Plane",
                visible: true,
            }),

            new StepItem({
                visible: true,
                name:"characteristic-points",
                descript: "Characteristic Points"
            }),

            new StepItem({
                visible: true,
                name:"jawboundary",
                descript: "Jaw Boundary"
            }),

            new StepItem({
                visible: true,
                name:"blockout-process",
                descript: "BlockOut"
            }),

            new StepItem({
                visible: false,
                name:"detector-process",
                descript: "AI Detector"
            }),

            new StepItem({
                visible: false,
                name:"recontructor-process",
                descript: "AI Reconsructor"
            }),
        ]

    },

    userDefined:{
    }
}

export const ContextViewer = React.createContext( contextViewer.default )