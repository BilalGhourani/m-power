$(document).ready(function () {

    window.addEventListener('resize', function(event) {
        resizeForm();
    }, true);

    function resizeForm(){
        let height = window.innerHeight;
        let formMaxHeight = 0.8 * height;
        $(".car_info_form").attr("style", "max-height:" + formMaxHeight + "px;overflow-y: auto;");
    }

    let params = (new URL(document.location)).searchParams;
    if (params.has("firstPlateNumber") && params.has("secondPlateNumber")) {
        let firstPlateNumber = params.get("firstPlateNumber");
        let secondPlateNumber = params.get("secondPlateNumber");
        $("#exampleFirstName").val(params.get("firstPlateNumber"));
        $("#exampleLastName").val(params.get("secondPlateNumber"));
        search()
    }


    $("#search").click(function (e) {
        e.preventDefault();
        fillFakeData();// search();

    });

    function search() {
        var fpn = $("#exampleFirstName").val();
        var spn = $("#exampleLastName").val();
        $.ajax({
            url: "http://localhost:8080/api/invoices/search",
            type: "GET",
            data: {
                firstPlateNumber: fpn,
                secondPlateNumber: spn
            },
            dataType: "json",
            success: function (result, status, xhr) {
                fillData(result[0]);
            },
            error: function (xhr, status, err) {
                alert("Request failed: " + xhr.responseJSON.message);
            }
        });
    }

    function fillData(data) {
        $("#car_name").text(data.name)//"BMW");
        $("#plate_first_number").text(data.plateFirstNumber)//"10");
        $("#car_type_code").text(data.type)//"X6");
        $("#plate_second_number").text(data.plateSecondNumber)//"92038");
        $("#car_color").text(data.color)//"Brown");
        $("#car_model").text(data.model)//"2016");
        $("#current_km").text(data.currentKM)//"650000");
        $("#next_km").text(data.nextKM)//"655000");
        $("#date_of_changing").text(data.dateOfChanges)//"14/07/2022");
        $("#user_name").text(data.username)//"655646444");
        $("#user_number").text(data.phone)//"655646444");
        $("#chassis_number").text(data.chassis_number)//"655646444");
    }

    function fillFakeData() {
        $("#car_name").text("BMW");
        $("#plate_first_number").text("81");
        $("#car_type_code").text("X6");
        $("#plate_second_number").text("123456");
        $("#car_color").text("Brown");
        $("#car_model").text("2016");
        $("#current_km").text("650000");
        $("#next_km").text("655000");
        $("#date_of_changing").text("14/07/2022");
        $("#user_name").text("Taha Hamdan");
        $("#user_number").text("965 9997 0480");
        $("#chassis_number").text("655646444");
    }

    $(".close_btn").click(function (e) {
        document.querySelector("#myModal").style.display = "none";
    });

    $("#generate-qrcode").click(function (e) {
        e.preventDefault();
        const fpv = document.querySelector("#exampleFirstName").value
        const lpv = document.querySelector("#exampleLastName").value
        if (fpv === undefined || fpv.length === 0 || lpv === undefined || lpv.length === 0) {
            alert("املأ رقم اللوحة الأول والثاني");//alert("fill your first and last plate number");
            return;
        }
        generate(fpv, lpv);
    });


    function generate(firstPlateNum, lastPlateNum) {
        let downloadBtnLink = document.querySelector(".qr-code button a");
        let qrCodeImg = document.querySelector(".qr-code img");
        if (qrCodeImg != null && qrCodeImg != undefined) {
            document.querySelector(".qr-code canvas").remove();
            qrCodeImg.remove();
        }
        document.querySelector(".qr-code").style = "";
        var qrcode = new QRCode(document.querySelector(".qr-code"), {
            text: `https://m-power-garage.000webhostapp.com/search.html?firstPlateNumber=${firstPlateNum}&secondPlateNumber=${lastPlateNum}`,
            width: 180, //128
            height: 180,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });

        console.log(qrcode);


        document.querySelector("#myModal").style.display = "block";
        downloadBtnLink.setAttribute("download", "qr_code_linq.png");

        if (qrCodeImg.getAttribute("src") == null) {
            setTimeout(() => {
                downloadBtnLink.setAttribute("href", `${document.querySelector("canvas").toDataURL()}`);
            }, 300);
        } else {
            setTimeout(() => {
                downloadBtnLink.setAttribute("href", `${document.querySelector(".qr-code img").getAttribute("src")}`);
            }, 300);
        }
    }

});