'use client'
import { FaRegTrashCan } from "react-icons/fa6";
import { GoPencil } from "react-icons/go";
import { FaRegEye } from "react-icons/fa";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "@/myComps/Modal.js"
import { Label } from "@/components/ui/label"

export default function Home() {
  const url = "http://localhost/contact/manage.php"
  const [contactTbl, setContactTbl] = useState([])
  const [userDetails, setUserDetails] = useState([]);
  const [openView, setOpenView] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  

  // For View Only
  const viewDetails = async (contactID) => {
    setOpenView(true);
    const fetchForm = new FormData();
    fetchForm.append("request", "view-details")
    fetchForm.append("id-request", contactID)

    try {
      const conn = await axios.post(url, fetchForm)
      if (conn.data.response) {
        console.log("Successfully Fetched User Details", conn.data.report)
        setUserDetails(conn.data.report)
      } else {
        console.log("Unsuccessful fetch result")
      }
    } catch (err) {
      console.error("Failed to Connect to Database", err);
    }
  };

  // For Update Only
  const updDetails = async (contactID) => {
    setOpenUpdate(true);
    const fetchForm = new FormData();
    fetchForm.append("request", "view-details")
    fetchForm.append("id-request", contactID)

    try {
      const conn = await axios.post(url, fetchForm)
      if (conn.data.response) {
        console.log("Successfully Fetched User Details", conn.data.report)
        setUserDetails(conn.data.report)
      } else {
        console.log("Unsuccessful fetch result")
      }
    } catch (err) {
      console.error("Failed to Connect to Database", err);
    }
  };

  // For Delete Only
  const delDetails = async (contactID) => {
    setOpenDelete(true);
    const fetchForm = new FormData();
    fetchForm.append("request", "view-details")
    fetchForm.append("id-request", contactID)

    try {
      const conn = await axios.post(url, fetchForm)
      if (conn.data.response) {
        console.log("Successfully Fetched User Details", conn.data.report)
        setUserDetails(conn.data.report)
      } else {
        console.log("Unsuccessful fetch result")
      }
    } catch (err) {
      console.error("Failed to Connect to Database", err);
    }
  };

  const closeView = () => setOpenView(false);
  const closeUpdate = () => setOpenUpdate(false);
  const closeDelete = () => setOpenDelete(false);



  useEffect(() => {
    axios.get(url).then((res) => {

      if (res.data.response) {
        console.log("Successfully Connected to Database!")
        setContactTbl(res.data.report)
      } else {
        console.log("Cant fetch data", res.data.report)
      }

    }).catch((err) => {
      console.error("Unsuccessful Connection", err)
    })
  }, [])

  return (
    <>
      <div className="m-4 p-6">

        <Card>
          <CardHeader>
            <CardTitle>Contact Table</CardTitle>
            <CardDescription>Table for Contacts</CardDescription>
          </CardHeader>
          <CardContent>

            <ScrollArea className="h-[400px]">
              <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contactTbl.map((contact) => (
                    <TableRow key={contact.contact_id}>
                      <TableCell>{contact.contact_name}</TableCell>
                      <TableCell>{contact.contact_phone}</TableCell>
                      <TableCell>

                        <div className="mx-3 flex space-x-1">
                          <Button onClick={() => viewDetails(contact.contact_id)}><FaRegEye /></Button>
                          <Button variant="secondary" onClick={() => updDetails(contact.contact_id)}><GoPencil /></Button>
                          <Button variant="destructive" onClick={() => delDetails(contact.contact_id)}><FaRegTrashCan /></Button>
                        </div>

                      </TableCell>

                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>

          </CardContent>
          <CardFooter>
            <Button>Add New Contact</Button>
          </CardFooter>
        </Card>
      </div>

      {/* View Details */}
      <Modal isOpen={openView} onClose={closeView}>
        <h2 className="text-xl font-bold text-black">View</h2>
        <div className="mt-2 flex flex-col space-y-2 text-black">
          {
            userDetails.map((details, index) => {
              return (
                <>
                  <ul key={index} className="space-y-1">
                    <li><Label htmlFor="name">Name: {details.contact_name}</Label></li>
                    <li><Label htmlFor="phone">Phone: {details.contact_phone}</Label></li>
                    <li><Label htmlFor="email">Email: {details.contact_email}</Label></li>
                    <li><Label htmlFor="address">Address: {details.contact_address}</Label></li>
                    <li><Label htmlFor="group">Group: {details.grp_name}</Label></li>
                    <li><Label htmlFor="owner">Owner: {details.usr_fullname}</Label></li>
                  </ul>
                </>

              )
            })
          }
        </div>
      </Modal>

      {/* Update Details */}
      <Modal isOpen={openUpdate} onClose={closeUpdate}>
        <h2 className="text-xl font-bold text-black">Update</h2>
        <div className="mt-2 flex flex-col space-y-2 text-black">
          {
            userDetails.map((details, index) => {
              return (
                <>
                  <ul key={index} className="space-y-1">
                    <li><Label htmlFor="name">Name: {details.contact_name}</Label></li>
                    <li><Label htmlFor="phone">Phone: {details.contact_phone}</Label></li>
                    <li><Label htmlFor="email">Email: {details.contact_email}</Label></li>
                    <li><Label htmlFor="address">Address: {details.contact_address}</Label></li>
                    <li><Label htmlFor="group">Group: {details.grp_name}</Label></li>
                    <li><Label htmlFor="owner">Owner: {details.usr_fullname}</Label></li>
                  </ul>

                    <Button className="flex justify-center">Confirm Update</Button>
                </>

              )
            })
          }
        </div>
      </Modal>

      {/* Delete Details */}
      <Modal isOpen={openDelete} onClose={closeDelete}>
        <h2 className="text-xl font-bold text-black">Delete</h2>
        <div className="mt-2 flex flex-col space-y-2 text-black">
          {
            userDetails.map((details, index) => {
              return (
                <>
                  <ul key={index} className="space-y-1">
                    <li><Label htmlFor="name">Name: {details.contact_name}</Label></li>
                    <li><Label htmlFor="phone">Phone: {details.contact_phone}</Label></li>
                    <li><Label htmlFor="email">Email: {details.contact_email}</Label></li>
                    <li><Label htmlFor="address">Address: {details.contact_address}</Label></li>
                    <li><Label htmlFor="group">Group: {details.grp_name}</Label></li>
                    <li><Label htmlFor="owner">Owner: {details.usr_fullname}</Label></li>
                  </ul>
                  
                  
                  <Button className="flex justify-center">Confirm Deletion</Button>
                </>
              )
            })
          }
        </div>
      </Modal>

    </>
  );
}
