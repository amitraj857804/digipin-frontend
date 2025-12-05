import { XIcon } from "lucide-react";
import { useEffect } from "react";
import AAVA_DemoInfo from "./AAVA_DemoInfo";

function AAVA_DemoModal({ isOpen, onClose }) {
  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9998]"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-[9999] p-4 pointer-events-none">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto scrollbar-hide pointer-events-auto">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="sticky top-0 right-0 ml-auto p-4 hover:bg-gray-100 rounded-lg transition-colors z-10 flex items-center justify-center"
          >
            <XIcon className="w-6 h-6 text-gray-600" />
          </button>

          {/* Content */}
          <div className="px-0 py-0">
            <AAVA_DemoInfo isModal={true} onClose={onClose} />
          </div>
        </div>
      </div>
    </>
  );
}

export default AAVA_DemoModal;
