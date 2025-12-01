import { useState, useEffect } from "react";
import { XIcon } from "lucide-react";
import Login from "./Login";
import Signup from "./Signup";

function AuthModal({ isOpen, onClose, initialTab = "login" }) {
  const [activeTab, setActiveTab] = useState(initialTab);

  // Update activeTab when initialTab changes
  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab, isOpen]);

  if (!isOpen) return null;

  const handleSwitchTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      {/* Backdrop - positioned to exclude navbar area */}
      <div 
        className="fixed inset-0 bg-transparent backdrop-blur-sm z-[9998] top-[81px] ]"
        
        onClick={onClose}
      />
      
      {/* Modal - centered on screen */}
      <div className="fixed inset-0 flex items-center justify-center z-[9999] p-4 pointer-events-none mt-14 ">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full relative max-h-[90vh] overflow-y-auto pointer-events-auto">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors z-10"
          >
            <XIcon className="w-6 h-6 text-gray-600 hover:rotate-90 transition-transform duration-200 ease-in cursor-pointer" />
          </button>

          {/* Auth Content */}
          <div >
            {activeTab === "login" ? (
              <Login 
                onSwitchTab={handleSwitchTab} 
                onClose={onClose} 
                isModal={true}
              />
            ) : (
              <Signup 
                onSwitchTab={handleSwitchTab} 
                onClose={onClose} 
                isModal={true}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AuthModal;
