'use client';


export default function Toggle({ deletePost, setToggle }) {
    return (
        <div className="fixed bg-black/50 w-full h-full z-20 left-0 top-0" onClick={() => setToggle(false)}>
            <div className="absolute bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 sm:p-12 p-6 w-4/5 sm:w-auto rounded-lg flex flex-col gap-6">
                <h2 className="text-lg">
                    Are you sure you want to delete this post? 🙄😕
                </h2>
                <h3 className="text-red-600 text-sm">
                    Pressing the delete button will permenantly delete your post! to sahi me krni hai na ?
                </h3>
                <button onClick={deletePost} className="text-sm font-bold bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 active:bg-red-800 transition-all">
                    Delete
                </button>
            </div>
        </div>
    )
}
