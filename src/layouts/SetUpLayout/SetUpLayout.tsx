import React, { ReactNode } from 'react';
import s from './SetUpLayout.module.scss';

export default function SetUpLayout() {
  return null;
}
//   const [activeTab, setActiveTab] = useState(1);

//   const howToSteps = [{ index: 1, value: '' }];

//   const howToContent = [
//     {
//       index: 1,
//       title: '',
//       text: '',
//     },
//   ];

//   return (
//     <div className={s.setup_container}>
//       <div className="howitworks-container">
//         <h2 className="howitworks-title"></h2>
//         <StepsProgress
//           setActiveStep={setActiveTab}
//           steps={howToSteps}
//           activeStep={activeTab}
//         />
//         <div className="howitworks-content">
//           <ContentTabs
//             items={howToContent}
//             activeTab={activeTab}
//             setActiveTab={setActiveTab}
//             handleClose={handleClose}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// type Content = {
//   index: number;
//   title: string;
//   text: string;
// };

// type LayoutProps = {
//   children: ReactNode;
//   length: number;
//   activeTab: number;
//   setActiveTab: (item: number) => void;
//   handleClose: () => void;
// };

// type TabsProps = {
//   items: Content[];
//   activeTab: number;
//   setActiveTab: (item: number) => void;
//   handleClose: () => void;
// };

// function ContentLayout({
//   children,
//   activeTab,
//   setActiveTab,
//   length,
//   handleClose,
// }: LayoutProps) {
//   return (
//     <div className="howitworks-layout">
//       {children}
//       <div className="howitworks-layout-buttons">
//         {activeTab !== 1 && (
//           <button
//             type="button"
//             onClick={() => setActiveTab(activeTab - 1)}
//             className="howitworks-layout-back howitworks-layout-button"
//           >
//             <p>Back</p>
//           </button>
//         )}
//         <button
//           type="button"
//           onClick={() => {
//             if (length === activeTab) {
//               handleClose();
//               setActiveTab(1);
//             } else {
//               setActiveTab(activeTab + 1);
//             }
//           }}
//           className="howitworks-layout-next howitworks-layout-button"
//         >
//           <p>{length === activeTab ? 'Finish' : 'Next'}</p>
//         </button>
//       </div>
//     </div>
//   );
// }

// function ContentTabs({
//   items,
//   activeTab,
//   setActiveTab,
//   handleClose,
// }: TabsProps) {
//   return (
//     <div className="howitworks-tabs">
//       <ContentLayout
//         activeTab={activeTab}
//         setActiveTab={setActiveTab}
//         length={items.length}
//         handleClose={handleClose}
//       >
//         <div className="howitworks-layout-text-container">
//           {items.map((item, i) => {
//             return (
//             //   <TransitionWrapper
//             //     duration={300}
//             //     key={i}
//             //     inState={activeTab === item.index}
//             //   >
//             //     <p className="howitworks-layout-text">
//             //       <b>{item.title}</b>&nbsp;{item.text}
//             //     </p>
//             //   </TransitionWrapper>
//             );
//           })}
//         </div>
//       </ContentLayout>
//     </div>
//   );
// }

// export default function HowItWorksPopup() {
//   const { showHowTo, setShowHowTo } = useHowToContext();
//   const { user, updateUserProperty } = useUserContext();

//   const handleClose = () => {
//     setShowHowTo(false);
//     handlePropertyViewed(
//       user,
//       updateUserProperty,
//       ...Array(2),
//       Constants.HOW_TO_VIEWED
//     );
//   };
// }
