// "use client"

// import { REGISTRATION_STEPS } from "@/lib/constants"
// import { useRegistration } from "@/contexts/RegistrationContext"
// import { cn } from "@/lib/utils"
// import { Check } from "lucide-react"

// export function StepIndicator() {
//   const { state } = useRegistration()

//   return (
//     <div className="w-full py-6">
//       <div className="flex items-center justify-between">
//         {REGISTRATION_STEPS.map((step, index) => {
//           const isActive = state.currentStep === index
//           const isCompleted = state.currentStep > index
//           const isAccessible = state.currentStep >= index

//           return (
//             <div key={step.id} className="flex items-center">
//               <div className="flex flex-col items-center">
//                 <div
//                   className={cn(
//                     "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors",
//                     isCompleted
//                       ? "bg-slate-600 border-slate-600 text-white"
//                       : isActive
//                         ? "border-slate-600 text-slate-600 bg-white"
//                         : isAccessible
//                           ? "border-slate-300 text-slate-400 bg-white"
//                           : "border-slate-200 text-slate-300 bg-slate-50",
//                   )}
//                 >
//                   {isCompleted ? (
//                     <Check className="h-5 w-5" />
//                   ) : (
//                     <span className="text-sm font-medium">{index + 1}</span>
//                   )}
//                 </div>
//                 <div className="mt-2 text-center">
//                   <p className={cn("text-xs font-medium", isActive ? "text-slate-900" : "text-slate-500")}>
//                     {step.title}
//                   </p>
//                   {step.isOptional && <p className="text-xs text-slate-400">Optional</p>}
//                 </div>
//               </div>
//               {index < REGISTRATION_STEPS.length - 1 && (
//                 <div
//                   className={cn("flex-1 h-0.5 mx-4 transition-colors", isCompleted ? "bg-slate-600" : "bg-slate-200")}
//                 />
//               )}
//             </div>
//           )
//         })}
//       </div>
//     </div>
//   )
// }
