import React, { type Dispatch, type FC }  from "react";
import { useComment } from "../api/hooks/useComment";

interface Props {
  setEditingItem:Dispatch<any>
}

const Blog:FC<Props> = ({setEditingItem}) => {
  const { getComments, DelMutation } = useComment();
  // const [dataa, setData] = useState(null);
  const { data } = getComments();
  console.log(data?.data);

  return (
    <div className="container mx-auto mt-6 px-4">
      <h2 className="text-xl font-bold mb-4">Blog</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-2">
        {data?.data?.map((item:any) => (
          <div
            key={item.id}
            className="border p-4 rounded-lg relative border-gray-200 shadow-sm hover:shadow-md transition"
          >
            <div>
              <h3 className="text-lg font-bold text-gray-800">{item.fname}</h3>
              <p className="text-sm text-gray-700 mb-1">{item.lname}</p>
              <strong className="text-sm block mb-1">
                {item.birthdate.split("T")[0]}
              </strong>
              <p className="text-sm text-blue-600 mb-3">{item.phone_number}</p>

              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <button
                    onClick={() => DelMutation.mutate(item.id)}
                    className="text-red-500 border border-red-400 hover:bg-red-50 rounded-md px-3 py-1 text-sm transition"
                  >
                    Delete
                  </button>
                  <button
                  onClick={()=>setEditingItem(item)}
                    className="text-green-600 border border-green-400 hover:bg-green-50 rounded-md px-3 py-1 text-sm transition"
                  >
                    Update
                  </button>
                </div>
                <p className="text-xs text-gray-400"></p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(Blog);
