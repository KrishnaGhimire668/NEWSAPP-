// import React from "react";

// const NewsCard = ({ news, onEdit, onDelete }) => {
//   const { title, description, media, mediaType, author } = news;

//   return (
//     <div className="bg-white rounded-lg shadow-md overflow-hidden w-full max-w-sm flex flex-col">
//       {/* Media */}
//       {media && mediaType === "video" ? (
//         <video src={media} controls className="w-full h-48 object-cover" />
//       ) : media ? (
//         <img src={media} alt={title} className="w-full h-48 object-cover" />
//       ) : null}

//       {/* Content */}
//       <div className="p-3 flex flex-col flex-grow">
//         <h2 className="text-lg font-semibold mb-1">{title}</h2>
//         <p className="text-gray-600 text-sm flex-grow">{description}</p>
//         {author && <p className="text-xs text-gray-400 mt-1">By {author.firstName} {author.lastName}</p>}
//         {(onEdit || onDelete) && (
//           <div className="flex justify-end gap-2 mt-3">
//             {onEdit && <button onClick={onEdit} className="px-2 py-1 bg-[#0055ff] text-white rounded text-sm hover:bg-blue-700 transition">Edit</button>}
//             {onDelete && <button onClick={onDelete} className="px-2 py-1 bg-[#0055ff] text-white rounded text-sm hover:bg-blue-700 transition">Delete</button>}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default NewsCard;


import React from "react";

const NewsCard = ({ news, onEdit, onDelete }) => {
  const { title, description, media, mediaType, author, createdAt, updatedAt } = news;

  // Format date nicely
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", { 
      weekday: "short", year: "numeric", month: "short", day: "numeric", 
      hour: "2-digit", minute: "2-digit" 
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-full max-w-sm flex flex-col">
      {media && mediaType === "video" ? (
        <video src={media} controls className="w-full h-48 object-cover" />
      ) : media ? (
        <img src={media} alt={title} className="w-full h-48 object-cover" />
      ) : null}

      <div className="p-3 flex flex-col flex-grow">
        <h2 className="text-lg font-semibold mb-1">{title}</h2>
        <p className="text-gray-600 text-sm flex-grow">{description}</p>
        {author && <p className="text-xs text-gray-400 mt-1">By {author.firstName} {author.lastName}</p>}
        
        {/* Date */}
        {createdAt && <p className="text-xs text-gray-400 mt-1">Posted: {formatDate(createdAt)}</p>}
        {updatedAt && updatedAt !== createdAt && <p className="text-xs text-gray-400">Updated: {formatDate(updatedAt)}</p>}

        {(onEdit || onDelete) && (
          <div className="flex justify-end gap-2 mt-3">
            {onEdit && <button onClick={onEdit} className="px-2 py-1 bg-[#0055ff] text-white rounded text-sm hover:bg-blue-700 transition">Edit</button>}
            {onDelete && <button onClick={onDelete} className="px-2 py-1 bg-[#0055ff] text-white rounded text-sm hover:bg-blue-700 transition">Delete</button>}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsCard;
