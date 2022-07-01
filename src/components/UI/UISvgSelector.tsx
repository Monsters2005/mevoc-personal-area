import React from 'react';

export function UISvgSelector({ id }: { id: string }) {
  switch (id) {
    case 'calendar':
      return (
        <svg
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <svg
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.2583 19.5518C12.4561 19.5518 12.6494 19.4931 12.8139 19.3832C12.9783 19.2733 13.1065 19.1172 13.1822 18.9344C13.2579 18.7517 13.2777 18.5506 13.2391 18.3567C13.2005 18.1627 13.1053 17.9845 12.9654 17.8447C12.8256 17.7048 12.6474 17.6096 12.4534 17.571C12.2594 17.5324 12.0583 17.5522 11.8756 17.6279C11.6929 17.7036 11.5367 17.8317 11.4268 17.9962C11.3169 18.1606 11.2583 18.354 11.2583 18.5518C11.2583 18.817 11.3637 19.0713 11.5512 19.2589C11.7387 19.4464 11.9931 19.5518 12.2583 19.5518ZM17.2583 19.5518C17.4561 19.5518 17.6494 19.4931 17.8139 19.3832C17.9783 19.2733 18.1065 19.1172 18.1822 18.9344C18.2579 18.7517 18.2777 18.5506 18.2391 18.3567C18.2005 18.1627 18.1053 17.9845 17.9654 17.8447C17.8256 17.7048 17.6474 17.6096 17.4534 17.571C17.2594 17.5324 17.0583 17.5522 16.8756 17.6279C16.6929 17.7036 16.5367 17.8317 16.4268 17.9962C16.3169 18.1606 16.2583 18.354 16.2583 18.5518C16.2583 18.817 16.3637 19.0713 16.5512 19.2589C16.7387 19.4464 16.9931 19.5518 17.2583 19.5518ZM17.2583 15.5518C17.4561 15.5518 17.6494 15.4931 17.8139 15.3832C17.9783 15.2733 18.1065 15.1172 18.1822 14.9344C18.2579 14.7517 18.2777 14.5506 18.2391 14.3567C18.2005 14.1627 18.1053 13.9845 17.9654 13.8447C17.8256 13.7048 17.6474 13.6096 17.4534 13.571C17.2594 13.5324 17.0583 13.5522 16.8756 13.6279C16.6929 13.7036 16.5367 13.8317 16.4268 13.9962C16.3169 14.1606 16.2583 14.354 16.2583 14.5518C16.2583 14.817 16.3637 15.0713 16.5512 15.2589C16.7387 15.4464 16.9931 15.5518 17.2583 15.5518ZM12.2583 15.5518C12.4561 15.5518 12.6494 15.4931 12.8139 15.3832C12.9783 15.2733 13.1065 15.1172 13.1822 14.9344C13.2579 14.7517 13.2777 14.5506 13.2391 14.3567C13.2005 14.1627 13.1053 13.9845 12.9654 13.8447C12.8256 13.7048 12.6474 13.6096 12.4534 13.571C12.2594 13.5324 12.0583 13.5522 11.8756 13.6279C11.6929 13.7036 11.5367 13.8317 11.4268 13.9962C11.3169 14.1606 11.2583 14.354 11.2583 14.5518C11.2583 14.817 11.3637 15.0713 11.5512 15.2589C11.7387 15.4464 11.9931 15.5518 12.2583 15.5518ZM19.2583 3.55176H18.2583V2.55176C18.2583 2.28654 18.1529 2.03219 17.9654 1.84465C17.7779 1.65711 17.5235 1.55176 17.2583 1.55176C16.9931 1.55176 16.7387 1.65711 16.5512 1.84465C16.3637 2.03219 16.2583 2.28654 16.2583 2.55176V3.55176H8.2583V2.55176C8.2583 2.28654 8.15294 2.03219 7.96541 1.84465C7.77787 1.65711 7.52352 1.55176 7.2583 1.55176C6.99308 1.55176 6.73873 1.65711 6.55119 1.84465C6.36366 2.03219 6.2583 2.28654 6.2583 2.55176V3.55176H5.2583C4.46265 3.55176 3.69959 3.86783 3.13698 4.43044C2.57437 4.99305 2.2583 5.75611 2.2583 6.55176V20.5518C2.2583 21.3474 2.57437 22.1105 3.13698 22.6731C3.69959 23.2357 4.46265 23.5518 5.2583 23.5518H19.2583C20.0539 23.5518 20.817 23.2357 21.3796 22.6731C21.9422 22.1105 22.2583 21.3474 22.2583 20.5518V6.55176C22.2583 5.75611 21.9422 4.99305 21.3796 4.43044C20.817 3.86783 20.0539 3.55176 19.2583 3.55176ZM20.2583 20.5518C20.2583 20.817 20.1529 21.0713 19.9654 21.2589C19.7779 21.4464 19.5235 21.5518 19.2583 21.5518H5.2583C4.99308 21.5518 4.73873 21.4464 4.55119 21.2589C4.36366 21.0713 4.2583 20.817 4.2583 20.5518V11.5518H20.2583V20.5518ZM20.2583 9.55176H4.2583V6.55176C4.2583 6.28654 4.36366 6.03219 4.55119 5.84465C4.73873 5.65711 4.99308 5.55176 5.2583 5.55176H6.2583V6.55176C6.2583 6.81697 6.36366 7.07133 6.55119 7.25886C6.73873 7.4464 6.99308 7.55176 7.2583 7.55176C7.52352 7.55176 7.77787 7.4464 7.96541 7.25886C8.15294 7.07133 8.2583 6.81697 8.2583 6.55176V5.55176H16.2583V6.55176C16.2583 6.81697 16.3637 7.07133 16.5512 7.25886C16.7387 7.4464 16.9931 7.55176 17.2583 7.55176C17.5235 7.55176 17.7779 7.4464 17.9654 7.25886C18.1529 7.07133 18.2583 6.81697 18.2583 6.55176V5.55176H19.2583C19.5235 5.55176 19.7779 5.65711 19.9654 5.84465C20.1529 6.03219 20.2583 6.28654 20.2583 6.55176V9.55176ZM7.2583 15.5518C7.45608 15.5518 7.64942 15.4931 7.81387 15.3832C7.97832 15.2733 8.10649 15.1172 8.18218 14.9344C8.25787 14.7517 8.27767 14.5506 8.23909 14.3567C8.2005 14.1627 8.10526 13.9845 7.96541 13.8447C7.82555 13.7048 7.64737 13.6096 7.45339 13.571C7.25941 13.5324 7.05834 13.5522 6.87562 13.6279C6.69289 13.7036 6.53671 13.8317 6.42683 13.9962C6.31695 14.1606 6.2583 14.354 6.2583 14.5518C6.2583 14.817 6.36366 15.0713 6.55119 15.2589C6.73873 15.4464 6.99308 15.5518 7.2583 15.5518ZM7.2583 19.5518C7.45608 19.5518 7.64942 19.4931 7.81387 19.3832C7.97832 19.2733 8.10649 19.1172 8.18218 18.9344C8.25787 18.7517 8.27767 18.5506 8.23909 18.3567C8.2005 18.1627 8.10526 17.9845 7.96541 17.8447C7.82555 17.7048 7.64737 17.6096 7.45339 17.571C7.25941 17.5324 7.05834 17.5522 6.87562 17.6279C6.69289 17.7036 6.53671 17.8317 6.42683 17.9962C6.31695 18.1606 6.2583 18.354 6.2583 18.5518C6.2583 18.817 6.36366 19.0713 6.55119 19.2589C6.73873 19.4464 6.99308 19.5518 7.2583 19.5518Z"
              fill="#C4C3CA"
            />
          </svg>
        </svg>
      );

    default:
      return null;
  }
}