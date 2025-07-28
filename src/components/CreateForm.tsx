import React, { useEffect, useState } from "react";
import { useComment } from "../api/hooks/useComment";

const CreateForm = ({editingItem,setEditingItem}:{editingItem:any,setEditingItem:any}) => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [phone_number, setPhoneNumber] = useState("");

  const { CreateMutation,EditMutation } = useComment();
  useEffect(()=>{
    if(editingItem){
      setFname(editingItem.fname)
      setLname(editingItem.lname)
      setBirthdate(editingItem.birthdate)
      setPhoneNumber(editingItem.phone_number)
    }
  },[editingItem])
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const blog = {fname,lname,birthdate,phone_number}
    if(editingItem){
      EditMutation.mutate({updatedUser:blog,id:editingItem.id})
      setEditingItem(null)
    }else{
      CreateMutation.mutate(blog);
    }
    setFname("");
    setLname("");
    setBirthdate("");
    setPhoneNumber("");
  };

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-xl font-bold my-6">Home</h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-2 gap-4 items-center"
      >
        <input
          value={fname}
          onChange={(e) => setFname(e.target.value)}
          className="border px-3 py-2 rounded-lg border-gray-300 text-sm"
          placeholder="First Name"
          type="text"
        />
        <input
          value={lname}
          onChange={(e) => setLname(e.target.value)}
          className="border px-3 py-2 rounded-lg border-gray-300 text-sm"
          placeholder="Last Name"
          type="text"
        />
        <input
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
          className="border px-3 py-2 rounded-lg border-gray-300 text-sm"
          placeholder="Birthdate"
          type="date"
        />
        <input
          value={phone_number}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="border px-3 py-2 rounded-lg border-gray-300 text-sm"
          type="text"
          placeholder="Phone number"
        />
        <button
          type="submit"
          className=" bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition text-sm"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default React.memo(CreateForm);
