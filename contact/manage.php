<?php

include "headers.php";

class MyMethods
{

    function updateData()
    {
        // include "db_connect.php";

        // $sql = "SELECT contact_id, contact_name, contact_phone from tblcontacts";
        // $stmt = $pdo->prepare($sql);

        // if ($results) {
        //     echo json_encode(["response" => true, "report" => $results]);
        // } else {
        //     echo json_encode(["response" => false, "report" => "Data not Available..."]);
        // }
    }


    function deleteData()
    {
        // include "db_connect.php";

        // $sql = "SELECT contact_id, contact_name, contact_phone from tblcontacts";
        // $stmt = $pdo->prepare($sql);

        // if ($results) {
        //     echo json_encode(["response" => true, "report" => $results]);
        // } else {
        //     echo json_encode(["response" => false, "report" => "Data not Available..."]);
        // }
    }


    function retrieveData()
    {
        // include "db_connect.php";

        // $sql = "SELECT contact_id, contact_name, contact_phone from tblcontacts";
        // $stmt = $pdo->prepare($sql);

        // if ($results) {
        //     echo json_encode(["response" => true, "report" => $results]);
        // } else {
        //     echo json_encode(["response" => false], "report" => "Data not Available...");
        // }
    }


    function fetchDataTable()
    {
        include "db_connect.php";

        $sql = "SELECT contact_id, contact_name, contact_phone from tblcontacts";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($results) {
            echo json_encode(["response" => true, "report" => $results]);
        } else {
            echo json_encode(["response" => false, "report" => "Data not Available..."]);
        }
    }

    function getUserInfo($getID)
    {
        include "db_connect.php";

        $sql = "SELECT a.contact_name, a.contact_phone, a.contact_email, a.contact_address, b.grp_name, c.usr_fullname 
                FROM tblcontacts a
                INNER JOIN tblgroups b ON a.contact_group = b.grp_id
                INNER JOIN tblusers c ON a.contact_userId = c.usr_id
                WHERE contact_id = :id
                ";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(":id", $getID);
        $stmt->execute();
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($results) {
            echo json_encode(["response" => true, "report" => $results]);
        } else {
            echo json_encode(["response" => false, "report" => "Data not Available..."]);
        }
    }
}

$method = new MyMethods();
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $request = $_POST["request"];
    switch ($request) {
        case "view-details":
            $getID = $_POST["id-request"];
            echo $method->getUserInfo($getID);
            break;

        case "add-details":
            break;

        case "delete-details":

            break;
        case "update-details":

            break;
            
        default:
            break;
    }
} else if ($_SERVER["REQUEST_METHOD"] == "GET") {

    echo $method->fetchDataTable();
} else {
    echo json_encode(["response" => false, "report" => "Method Not Available"]);
}

// http://localhost/contact/manage.php