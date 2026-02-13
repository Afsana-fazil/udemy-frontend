
  
  export default function Explore() {
    return (
      <div className="max-w-6xl mx-auto px-8">
        <div className='lg:w-[63%]'>
            {/* Topics */}
            <div className="mb-8">
            <h2 className="text-xl text-[#2a2b3f] font-bold mb-3">Explore related topics</h2>
            <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 border border-solid rounded border-[#9194ac] text-[#2a2b3f] text-sm font-medium">ChatGPT</span>
                <span className="px-3 py-1 border border-solid rounded border-[#9194ac] text-[#2a2b3f] text-sm font-medium">Other Office Productivity</span>
                <span className="px-3 py-1 border border-solid rounded border-[#9194ac] text-[#2a2b3f] text-sm font-medium">Office Productivity</span>
            </div>
            </div>
    
            {/* Course Includes */}
            <div className="mb-10">
            <h2 className="text-xl text-[#2a2b3f] font-bold mb-4">This course includes:</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-3 text-[#2a2b3f]">
                    <svg
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 256 256"
                        className="h-5 w-4"
                        fill="none"
                        stroke="#2a2b3f"
                        >
                        <g>
                            <path stroke="#2a2b3f" strokeWidth="10"
                            d="M27.1,37.5c-8.1,1.6-15.2,9.1-16.5,17.5c-0.3,2-0.5,21.5-0.5,57.4c0,59,0,57.8,2.5,62.9c1.5,3,5.3,7.1,7.8,8.6
                            c5,2.9,1.2,2.7,54.6,3l48.6,0.2l0.1,11.6l0.1,11.7l-23.6,0.1l-23.6,0.1l-0.1,4.2l-0.1,4.3H128h51.7l-0.1-4.3l-0.1-4.2l-23.6-0.1
                            l-23.6-0.1l0.1-11.7l0.1-11.6l48.6-0.2c53.4-0.2,49.6,0,54.6-3c2.6-1.5,6.4-5.6,7.8-8.6c2.6-5.1,2.5-3.9,2.5-62.9
                            c0-35.9-0.2-55.4-0.5-57.4c-1.3-8.3-7.6-15.1-15.9-17.3C227.2,37,215.5,36.9,128,37C73.3,37,28.2,37.2,27.1,37.5z M229.2,46.4
                            c2.9,1.2,5.1,3.4,6.6,6.3l1.4,2.8v56.1c0,63.7,0.3,58.8-3.9,62.9c-4.3,4.3,6,3.9-105.3,3.9c-108.5,0-100.8,0.2-104.6-3
                            c-1.1-0.9-2.5-2.6-3.2-3.8l-1.2-2.2l-0.1-56.9l-0.1-56.9l1.4-2.9c1.5-3.1,4-5.4,6.8-6.4c1.4-0.5,20.3-0.6,101.2-0.6
                            C215.1,45.7,227.8,45.8,229.2,46.4z"
                            />
                            <path stroke="#2a2b3f" strokeWidth="10" fill="#2a2b3f"
                            d="M106.3,111.2c0,17.2,0,31.3,0.1,31.3s11.9-6.8,26.2-15c14.3-8.2,26.5-15.3,27.1-15.6c1-0.6-0.2-1.3-17.7-11.4
                            c-10.3-6-22.6-13-27.2-15.7l-8.4-4.9V111.2z"
                            />
                        </g>
                    </svg>
                    33.5 hours on-demand video
                </div>
                <div className="flex items-center gap-3 text-[#2a2b3f]">
                    <svg width="18px" height="18px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                        <path fill="var(--ci-primary-color, #2a2b3f)" d="M472,64H40A24.028,24.028,0,0,0,16,88V424a24.028,24.028,0,0,0,24,24H472a24.028,24.028,0,0,0,24-24V88A24.028,24.028,0,0,0,472,64Zm-8,352H48V96H464Z"/>
                        <path fill="var(--ci-primary-color, #2a2b3f)" d="M184,344a87.108,87.108,0,0,0,54.484-18.891L218.659,299.99A55.41,55.41,0,0,1,184,312a56,56,0,0,1,0-112,55.41,55.41,0,0,1,34.659,12.01l19.825-25.119A87.108,87.108,0,0,0,184,168a88,88,0,0,0,0,176Z"/>
                        <path fill="var(--ci-primary-color, #2a2b3f)" d="M347.429,344a87.108,87.108,0,0,0,54.484-18.891L382.088,299.99A55.414,55.414,0,0,1,347.429,312a56,56,0,0,1,0-112,55.414,55.414,0,0,1,34.659,12.01l19.825-25.119A87.108,87.108,0,0,0,347.429,168a88,88,0,0,0,0,176Z"/>
                    </svg>
                    Closed captions
                </div>
                <div className="flex items-center gap-3 text-[#2a2b3f]">
                    <svg width="18px" height="18px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="#2a2b3f">
                        <path fillRule="evenodd" d="M8.6,4.99999 L8.6,12.6 L1.4,12.6 L1.4,1.4 L5,1.4 L5,4.99999 L8.6,4.99999 Z M7.6201,3.59999 L6.4,2.3799 L6.4,3.59999 L7.6201,3.59999 Z M10,4 L6,0 L0,0 L0,14 L10,14 L10,4 Z M2.79688,7 L7.2,7 L7.2,8.4 L2.79688,8.4 L2.79688,7 Z M7.2,9.8 L2.79688,9.8 L2.79688,11.2 L7.2,11.2 L7.2,9.8 Z" transform="translate(3 1)"/>
                    </svg>
                    articles
                </div>
                <div className="flex items-center gap-3 text-[#2a2b3f]">
                    <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.41667 14L8.5 9L10.5833 14M6.41667 14L6 15M6.41667 14H10.5833M10.5833 14L11 15M13.5 9.5V14.5C13.5 14.7761 13.7239 15 14 15H15C16.6569 15 18 13.6569 18 12C18 10.3431 16.6569 9 15 9H14C13.7239 9 13.5 9.22386 13.5 9.5ZM5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z" stroke="#2a2b3f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Audio description in existing audio
                </div>
                <div className="flex items-center gap-3 text-[#2a2b3f]">
                    <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 15V21M19 21L17 19M19 21L21 19M13 3H8.2C7.0799 3 6.51984 3 6.09202 3.21799C5.71569 3.40973 5.40973 3.71569 5.21799 4.09202C5 4.51984 5 5.0799 5 6.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.0799 21 8.2 21H14M13 3L19 9M13 3V7.4C13 7.96005 13 8.24008 13.109 8.45399C13.2049 8.64215 13.3578 8.79513 13.546 8.89101C13.7599 9 14.0399 9 14.6 9H19M19 9V11" stroke="#2a2b3f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    120 downloadable resources
                </div>
                <div className="flex items-center gap-3 text-[#2a2b3f]">
                    <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 21H16M12 21V17M12 17C9.23858 17 7 14.7614 7 12V4H17V12C17 14.7614 14.7614 17 12 17ZM17 6H18.5C19.8807 6 21 7.11929 21 8.5C21 9.88071 19.8807 11 18.5 11H17M7 11H5.5C4.11929 11 3 9.88071 3 8.5C3 7.11929 4.11929 6 5.5 6H7" stroke="#2a2b3f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Certificate of completion
                </div>
                <div className="flex items-center gap-3 text-[#2a2b3f]">
                    <svg width="18px" height="18px" viewBox="0 0 17 17" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.5 0h-8c-0.827 0-1.5 0.673-1.5 1.5v14c0 0.827 0.673 1.5 1.5 1.5h8c0.827 0 1.5-0.673 1.5-1.5v-14c0-0.827-0.673-1.5-1.5-1.5zM4.5 1h8c0.276 0 0.5 0.224 0.5 0.5v1.5h-9v-1.5c0-0.276 0.224-0.5 0.5-0.5zM13 4v8h-9v-8h9zM12.5 16h-8c-0.276 0-0.5-0.224-0.5-0.5v-2.5h9v2.5c0 0.276-0.224 0.5-0.5 0.5zM9 14.5c0 0.276-0.224 0.5-0.5 0.5s-0.5-0.224-0.5-0.5 0.224-0.5 0.5-0.5 0.5 0.224 0.5 0.5z" fill="#2a2b3f" />
                    </svg>
                    Access on mobile and TV
                </div>
            </div>
            </div>
        </div>
      </div>
    );
  }
  