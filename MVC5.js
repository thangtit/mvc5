Chú Thích Dữ Liệu trong MVC5
[Required(ErrorMessage = "Tên là bắt buộc.")]
[StringLength(100, MinimumLength = 5, ErrorMessage = "Độ dài chuỗi phải từ 5 đến 100 ký tự.")]
[MaxLength(50)]: Giới hạn độ dài tối đa của chuỗi là 50.
[MinLength(10, ErrorMessage = "Chuỗi phải có ít nhất 10 ký tự.")]:Yêu cầu độ dài tối thiểu của chuỗi.
[Range(1, 100, ErrorMessage = "Giá trị phải nằm trong khoảng từ 1 đến 100.")]: Đảm bảo giá trị thuộc tính nằm trong một khoảng cụ thể.
[RegularExpression(@"^[a-zA-Z]+$", ErrorMessage = "Chỉ được nhập chữ.")]
[EmailAddress(ErrorMessage = "Email không hợp lệ.")]
[Phone(ErrorMessage = "Số điện thoại không hợp lệ.")]
[ForeignKey("KhachHang")]: Khóa ngoài
[RegularExpression(@"^\d{10,11}$", ErrorMessage = "Số điện thoại không hợp lệ (10-11 chữ số)")]: Điện thoại phải đúng định dạng
[ForeignKey("KhachHang")]: Khóa ngoài
 [Key, Column(Order = 0)],   [Key, Column(Order = 1)]: 2 khóa chính
[Range(1, double.MaxValue, ErrorMessage = "Đơn giá phải lớn hơn 0")]:
[Range(0, int.MaxValue, ErrorMessage = "Số lượng tồn phải lớn hơn hoặc bằng 0")]
[DataType(DataType.Date, ErrorMessage = "Ngày bán phải là dữ liệu ngày tháng năm")]
-----------
[Url(ErrorMessage = "URL không hợp lệ.")]
[Display(Name = "Họ và Tên")]:Xác định nhãn hiển thị hoặc các thuộc tính liên quan cho trường dữ liệu.
[DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}", ApplyFormatInEditMode = true)]: Định dạng cách giá trị được hiển thị.
[DataType(DataType.Date)]: Quy định kiểu dữ liệu cụ thể, chẳng hạn như Date, Time, Currency.
[ForeignKey("KhachHang")]: Khóa ngoài



//////////////HoaDonDatMon///////////////
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using Test1.Models;

namespace Test1.Controllers
{
    public class HoaDonDatMonController : Controller
    {
        private MonAn1DataContext db = new MonAn1DataContext();

        // GET: HoaDonDatMon
        public ActionResult Index(string searchString)
        {
            //Tim kiếm theo tên kh
            var hoaDonDatMons = db.HoaDonDatMons.Include(h => h.MonAn1).Include(h => h.KhachHang1);

            if (!string.IsNullOrEmpty(searchString))
            {
                hoaDonDatMons = hoaDonDatMons.Where(hd => hd.KhachHang1.HoTen.Contains(searchString));
            }

            return View(hoaDonDatMons.ToList());
        }
        //Tim kiếm theo mã kh
        //public ActionResult Index(int? searchId)
        //{
        //    var hoaDonDatMons = db.HoaDonDatMons.Include(h => h.MonAn1).Include(h => h.KhachHang1);
        //    if(searchId.HasValue)
        //    {
        //        hoaDonDatMons = hoaDonDatMons
        //            .Where(hd => hd.KhachHang1.MaKH == searchId.Value);
        //    }

        //    return View(hoaDonDatMons.ToList());
        //}

        // GET: HoaDonDatMon/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            HoaDonDatMon hoaDonDatMon = db.HoaDonDatMons.Find(id);
            if (hoaDonDatMon == null)
            {
                return HttpNotFound();
            }
            return View(hoaDonDatMon);
        }

        // GET: HoaDonDatMon/Create
        public ActionResult Create()
        {
            ViewBag.MaMon = new SelectList(db.MonAn1, "MaMon", "TenMon");
            ViewBag.MaKH = new SelectList(db.KhachHang1, "MaKH", "HoTen");
            return View();
        }

        // POST: HoaDonDatMon/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "MaHD,MaMon,MaKH,NgayDat,SoLuong")] HoaDonDatMon hoaDonDatMon)
        {
            if (ModelState.IsValid)
            {
                db.HoaDonDatMons.Add(hoaDonDatMon);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.MaMon = new SelectList(db.MonAn1, "MaMon", "TenMon", hoaDonDatMon.MaMon);
            ViewBag.MaKH = new SelectList(db.KhachHang1, "MaKH", "HoTen", hoaDonDatMon.MaKH);
            return View(hoaDonDatMon);
        }

        // GET: HoaDonDatMon/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            HoaDonDatMon hoaDonDatMon = db.HoaDonDatMons.Find(id);
            if (hoaDonDatMon == null)
            {
                return HttpNotFound();
            }
            ViewBag.MaMon = new SelectList(db.MonAn1, "MaMon", "TenMon", hoaDonDatMon.MaMon);
            ViewBag.MaKH = new SelectList(db.KhachHang1, "MaKH", "HoTen", hoaDonDatMon.MaKH);
            return View(hoaDonDatMon);
        }

        // POST: HoaDonDatMon/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "MaHD,MaMon,MaKH,NgayDat,SoLuong")] HoaDonDatMon hoaDonDatMon)
        {
            if (ModelState.IsValid)
            {
                db.Entry(hoaDonDatMon).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.MaMon = new SelectList(db.MonAn1, "MaMon", "TenMon", hoaDonDatMon.MaMon);
            ViewBag.MaKH = new SelectList(db.KhachHang1, "MaKH", "HoTen", hoaDonDatMon.MaKH);
            return View(hoaDonDatMon);
        }

        // GET: HoaDonDatMon/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            HoaDonDatMon hoaDonDatMon = db.HoaDonDatMons.Find(id);
            if (hoaDonDatMon == null)
            {
                return HttpNotFound();
            }
            return View(hoaDonDatMon);
        }

        // POST: HoaDonDatMon/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            HoaDonDatMon hoaDonDatMon = db.HoaDonDatMons.Find(id);
            db.HoaDonDatMons.Remove(hoaDonDatMon);
            db.SaveChanges();
            return RedirectToAction("Index");
        }
        //tổng doanh thu của từng món ăn và lấy món ăn có doanh thu cao nhất
        public ActionResult TopRevenueDish()
        {
            // Tính tổng doanh thu cho từng món ăn
            var topDish = db.HoaDonDatMons
                .GroupBy(hd => hd.MonAn1)
                .Select(group => new
                {
                    MonAn = group.Key,
                    TotalRevenue = group.Sum(hd => (hd.MonAn1.DonGia ?? 0) * (hd.SoLuong ?? 0))
                })
                .OrderByDescending(x => x.TotalRevenue)
                .FirstOrDefault();

            // Nếu không có dữ liệu
            if (topDish == null)
            {
                return View("NoData");
            }

            // Chuyển dữ liệu đến View
            ViewBag.TotalRevenue = topDish.TotalRevenue;
            return View(topDish.MonAn);
        }
        //món ăn có doanh thu thấp nhất
        public ActionResult LowestRevenueDish()
        {
        
            var lowestDish = db.HoaDonDatMons
                .GroupBy(hd => hd.MonAn1)
                .Select(group => new
                {
                    MonAn = group.Key,
                    TotalRevenue = group.Sum(hd => (hd.MonAn1.DonGia ?? 0) * (hd.SoLuong ?? 0))
                })
                .OrderBy(x => x.TotalRevenue) 
                .FirstOrDefault(); 

            if (lowestDish == null)
            {
                return View("NoData");
            }

            ViewBag.TotalRevenue = lowestDish.TotalRevenue;
            return View(lowestDish.MonAn);
        }
        public ActionResult TopQuantityInvoice()
        {
            // Tìm hóa đơn có số lượng nhiều nhất
            var topInvoice = db.HoaDonDatMons
                .OrderByDescending(hd => hd.SoLuong)  
                .FirstOrDefault(); 

            if (topInvoice == null)
            {
                return View("NoData");
            }

            return View(topInvoice);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}

/////////////////////////////index/////////////
@model IEnumerable<Test1.Models.HoaDonDatMon>

@{
    ViewBag.Title = "Index";
}

<h2>Index</h2>

<!-- Form tìm kiếm tên -->
<form method="get" action="@Url.Action("Index")" class="form-inline">
    <div class="form-group">
        <label for="searchString">Tìm kiếm theo tên khách hàng:</label>
        <input type="text" name="searchString" id="searchString" class="form-control"
               value="@Request.QueryString["searchString"]" placeholder="Nhập tên khách hàng" />
    </div>
    <button type="submit" class="btn btn-primary">Search</button>
</form>
<!-- Form tìm kiếm mã KH -->
@*<form method="get" action="@Url.Action("Index")" class="form-inline">
        <div class="form-group">


            <label for="searchId">Tìm kiếm theo mã khách hàng:</label>

            <
            <input type="number" name="searchId" id="searchId" class="form-control"
                   value="@ViewBag.SearchId" placeholder="Nhập mã khách hàng" />
        </div>


        <button type="submit" class="btn btn-primary">Search</button>
    </form>*@


<p>
    @Html.ActionLink("Create New", "Create")
</p>
<table class="table">
    <tr>
        <th>
            @Html.DisplayNameFor(model => model.MaHD)
        </th>
        <th>
            @Html.DisplayNameFor(model => model.MaKH)
        </th>
        <th>
            @Html.DisplayNameFor(model => model.NgayDat)
        </th>
        <th>
            @Html.DisplayNameFor(model => model.SoLuong)
        </th>
        <th>
            @Html.DisplayNameFor(model => model.MonAn1.TenMon)
        </th>
        <th>
            @Html.DisplayNameFor(model => model.KhachHang1.HoTen)
        </th>
        <th>
            Thành tiền
        </th>

        <th></th>
    </tr>

    @foreach (var item in Model)
    {
        <tr>
            <td>
                @Html.DisplayFor(modelItem => item.MaHD)
            </td>
            <td>
                @Html.DisplayFor(modelItem => item.MaKH)
            </td>
            <td>
                @Html.DisplayFor(modelItem => item.NgayDat)
            </td>
            <td>
                @Html.DisplayFor(modelItem => item.SoLuong)
            </td>
            <td>
                @Html.DisplayFor(modelItem => item.MonAn1.TenMon)
            </td>
            <td>
                @Html.DisplayFor(modelItem => item.KhachHang1.HoTen)
            </td>
            <td>
                @((item.MonAn1.DonGia ?? 0) * (item.SoLuong ?? 0))
            </td>

            <td>
                @Html.ActionLink("Edit", "Edit", new { id = item.MaHD }) |
                @Html.ActionLink("Details", "Details", new { id = item.MaHD }) |
                @Html.ActionLink("Delete", "Delete", new { id = item.MaHD })
            </td>
        </tr>
    }

</table>

////////////////////////Hóa đơn có số lượng nhiều nhất/////////

@{
    ViewBag.Title = "Hóa đơn có số lượng nhiều nhất";
}

<h2>@ViewBag.Title</h2>

<table class="table">
    <tr>
        <th>Mã hóa đơn</th>
        <th>Mã món</th>
        <th>Tên món</th>
        <th>Ngày đặt</th>
        <th>Số lượng</th>
        <th>Tên khách hàng</th>
    </tr>
    <tr>
        <td>@Model.MaHD</td>
        <td>@Model.MaMon</td>
        <td>@Model.MonAn1.TenMon</td>
        <td>@Model.NgayDat</td>
        <td>@Model.SoLuong</td>
        <td>@Model.KhachHang1.HoTen</td>
    </tr>
</table>

<p>
    @Html.ActionLink("Back to List", "Index")
</p>


/////////////////////Món ăn có tổng doanh thu cao nhất//////
@{
    ViewBag.Title = "Món ăn có tổng doanh thu cao nhất";
}

<h2>@ViewBag.Title</h2>

<table class="table">
    <tr>
        <th>Mã món</th>
        <th>Tên món</th>
        <th>Loại món</th>
        <th>Đơn giá</th>
        <th>Tổng doanh thu</th>
    </tr>
    <tr>
        <td>@Model.MaMon</td>
        <td>@Model.TenMon</td>
        <td>@Model.LoaiMon</td>
        <td>@Model.DonGia</td>
        <td>@ViewBag.TotalRevenue</td>
    </tr>
</table>

<p>
    @Html.ActionLink("Back to List", "Index")
</p>

///////////////////////////Món ăn có tổng doanh thu thấp nhất//////

@{
    ViewBag.Title = "Món ăn có tổng doanh thu thấp nhất";
}

<h2>@ViewBag.Title</h2>

<table class="table">
    <tr>
        <th>Mã món</th>
        <th>Tên món</th>
        <th>Loại món</th>
        <th>Đơn giá</th>
        <th>Tổng doanh thu</th>
    </tr>
    <tr>
        <td>@Model.MaMon</td>
        <td>@Model.TenMon</td>
        <td>@Model.LoaiMon</td>
        <td>@Model.DonGia</td>
        <td>@ViewBag.TotalRevenue</td>
    </tr>
</table>

<p>
    @Html.ActionLink("Back to List", "Index")
</p>

//////////////////////controllerMonAn//////////
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using Test1.Models;

namespace Test1.Controllers
{
    public class MonAn1Controller : Controller
    {
        private MonAn1DataContext db = new MonAn1DataContext();

        // GET: MonAn1
        public ActionResult Index()
        {
            return View(db.MonAn1.ToList());
        }

        // GET: MonAn1/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            MonAn1 monAn1 = db.MonAn1.Find(id);
            if (monAn1 == null)
            {
                return HttpNotFound();
            }
            return View(monAn1);
        }

        // GET: MonAn1/Create
        public ActionResult Create()
        {
            ViewBag.LoaiMonList = new SelectList(new[] { "Món chính", "Món phụ", "Tráng miệng", "Đồ uống" });
            return View();
        }

        // POST: MonAn1/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "MaMon,TenMon,LoaiMon,DonGia")] MonAn1 monAn1)
        {
            if (ModelState.IsValid)
            {
                db.MonAn1.Add(monAn1);
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.LoaiMonList = new SelectList(new[] { "Món chính", "Món phụ", "Tráng miệng", "Đồ uống" });
            return View(monAn1);
        }

        // GET: MonAn1/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            MonAn1 monAn1 = db.MonAn1.Find(id);
            if (monAn1 == null)
            {
                return HttpNotFound();
            }
            ViewBag.LoaiMonList = new SelectList(new[] { "Món chính", "Món phụ", "Tráng miệng", "Đồ uống" });
            return View(monAn1);
        }

        // POST: MonAn1/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "MaMon,TenMon,LoaiMon,DonGia")] MonAn1 monAn1)
        {
            if (ModelState.IsValid)
            {
                db.Entry(monAn1).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.LoaiMonList = new SelectList(new[] { "Món chính", "Món phụ", "Tráng miệng", "Đồ uống" });
            return View(monAn1);
        }

        // GET: MonAn1/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            MonAn1 monAn1 = db.MonAn1.Find(id);
            if (monAn1 == null)
            {
                return HttpNotFound();
            }
            return View(monAn1);
        }

        // POST: MonAn1/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            MonAn1 monAn1 = db.MonAn1.Find(id);
            db.MonAn1.Remove(monAn1);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}

//////////////////Create///////////////
@model Test1.Models.MonAn1

@{
    ViewBag.Title = "Create";
}

<h2>Create</h2>


@using (Html.BeginForm()) 
{
    @Html.AntiForgeryToken()
    
    <div class="form-horizontal">
        <h4>MonAn1</h4>
        <hr />
        @Html.ValidationSummary(true, "", new { @class = "text-danger" })
        <div class="form-group">
            @Html.LabelFor(model => model.MaMon, htmlAttributes: new { @class = "control-label col-md-2" })
            <div class="col-md-10">
                @Html.EditorFor(model => model.MaMon, new { htmlAttributes = new { @class = "form-control" } })
                @Html.ValidationMessageFor(model => model.MaMon, "", new { @class = "text-danger" })
            </div>
        </div>

        <div class="form-group">
            @Html.LabelFor(model => model.TenMon, htmlAttributes: new { @class = "control-label col-md-2" })
            <div class="col-md-10">
                @Html.EditorFor(model => model.TenMon, new { htmlAttributes = new { @class = "form-control" } })
                @Html.ValidationMessageFor(model => model.TenMon, "", new { @class = "text-danger" })
            </div>
        </div>

        <div class="form-group">
            @Html.LabelFor(model => model.LoaiMon, htmlAttributes: new { @class = "control-label col-md-2" })
            <div class="col-md-10">
                @Html.DropDownListFor(
          model => model.LoaiMon,
          new SelectList(new[] { "Món chính", "Món phụ", "Tráng miệng", "Đồ uống" }),
          "Chọn loại món",
          new { @class = "form-control" }
      )
              
                @Html.ValidationMessageFor(model => model.LoaiMon, "", new { @class = "text-danger" })
            </div>
        </div>

        <div class="form-group">
            @Html.LabelFor(model => model.DonGia, htmlAttributes: new { @class = "control-label col-md-2" })
            <div class="col-md-10">
                @Html.EditorFor(model => model.DonGia, new { htmlAttributes = new { @class = "form-control" } })
                @Html.ValidationMessageFor(model => model.DonGia, "", new { @class = "text-danger" })
            </div>
        </div>

        <div class="form-group">
            <div class="col-md-offset-2 col-md-10">
                <input type="submit" value="Create" class="btn btn-default" />
            </div>
        </div>
    </div>
}

<div>
    @Html.ActionLink("Back to List", "Index")
</div>

@section Scripts {
    @Scripts.Render("~/bundles/jqueryval")
}

//////////////////////////Edit////////////////
@model Test1.Models.MonAn1

@{
    ViewBag.Title = "Edit";
}

<h2>Edit</h2>


@using (Html.BeginForm())
{
    @Html.AntiForgeryToken()
    
    <div class="form-horizontal">
        <h4>MonAn1</h4>
        <hr />
        @Html.ValidationSummary(true, "", new { @class = "text-danger" })
        @Html.HiddenFor(model => model.MaMon)

        <div class="form-group">
            @Html.LabelFor(model => model.TenMon, htmlAttributes: new { @class = "control-label col-md-2" })
            <div class="col-md-10">
                @Html.EditorFor(model => model.TenMon, new { htmlAttributes = new { @class = "form-control" } })
                @Html.ValidationMessageFor(model => model.TenMon, "", new { @class = "text-danger" })
            </div>
        </div>

        <div class="form-group">
            @Html.LabelFor(model => model.LoaiMon, htmlAttributes: new { @class = "control-label col-md-2" })
            <div class="col-md-10">

                @Html.DropDownListFor(
             model => model.LoaiMon,
             new SelectList(new[] { "Món chính", "Món phụ", "Tráng miệng", "Đồ uống" }),
             "Chọn loại món",
             new { @class = "form-control" }
         )
                @Html.ValidationMessageFor(model => model.LoaiMon, "", new { @class = "text-danger" })
            </div>
        </div>

        <div class="form-group">
            @Html.LabelFor(model => model.DonGia, htmlAttributes: new { @class = "control-label col-md-2" })
            <div class="col-md-10">
                @Html.EditorFor(model => model.DonGia, new { htmlAttributes = new { @class = "form-control" } })
                @Html.ValidationMessageFor(model => model.DonGia, "", new { @class = "text-danger" })
            </div>
        </div>

        <div class="form-group">
            <div class="col-md-offset-2 col-md-10">
                <input type="submit" value="Save" class="btn btn-default" />
            </div>
        </div>
    </div>
}

<div>
    @Html.ActionLink("Back to List", "Index")
</div>

@section Scripts {
    @Scripts.Render("~/bundles/jqueryval")
}

/////////////////////////De32/////////////
////////////////controllerHoaDonBan//////////////
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using Test2.Models;

namespace Test2.Controllers
{
    public class HoaDonBan2Controller : Controller
    {
        private qlbansachDataContext db = new qlbansachDataContext();

        // GET: HoaDonBan2
        //Tim theo tên
        //public ActionResult Index(string searchString)
        //{
        //    var hoaDonBan = db.HoaDonBan2
        //        .Include("Sach2")
        //        .Include("KhachHang2")
        //        .AsQueryable();
        //    if (!String.IsNullOrEmpty(searchString))
        //    {
        //        hoaDonBan = hoaDonBan.Where(hd => hd.KhachHang2.HoTen.Contains(searchString));
        //        if (!hoaDonBan.Any())
        //        {
        //            ViewBag.Message = "Không tìm thấy hóa đơn bán cho khách hàng '" + searchString + "'.";
        //        }
        //        else
        //        {
        //            ViewBag.Message = "Tìm kiếm thành công.";
        //        }
        //    }

        //    return View(hoaDonBan.ToList());
        //}

        //tìm theo mã
        public ActionResult Index(string searchString)
        {
            var hoaDonBan = db.HoaDonBan2
                .Include("Sach2")
                .Include("KhachHang2")
                .AsQueryable();

            if (!String.IsNullOrEmpty(searchString))
            {
                int maKH;
                if (int.TryParse(searchString, out maKH))
                {
                    // If searchString can be parsed as an integer, filter by MaKH
                    hoaDonBan = hoaDonBan.Where(hd => hd.MaKH == maKH);

                    // Check if any results were found
                    if (!hoaDonBan.Any())
                    {
                        ViewBag.Message = "Không tìm thấy hóa đơn bán cho khách hàng với mã '" + searchString + "'.";
                    }
                    else
                    {
                        ViewBag.Message = "Tìm kiếm thành công.";
                    }
                }
                else
                {
                    // If the searchString is not a valid integer, show an error message
                    ViewBag.Message = "Mã khách hàng không hợp lệ.";
                }
            }

            // Pass the filtered list of invoices to the view
            return View(hoaDonBan.ToList());
        }


        // GET: HoaDonBan2/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            HoaDonBan2 hoaDonBan2 = db.HoaDonBan2.Find(id);
            if (hoaDonBan2 == null)
            {
                return HttpNotFound();
            }
            return View(hoaDonBan2);
        }

        // GET: HoaDonBan2/Create
        public ActionResult Create()
        {
            ViewBag.MaSach = new SelectList(db.Sach2, "MaSach", "TenSach");
            ViewBag.MaKH = new SelectList(db.KhachHang2, "MaKH", "HoTen");
            return View();
        }

        // POST: HoaDonBan2/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "MaHD,MaSach,MaKH,NgayBan,SoLuong")] HoaDonBan2 hoaDonBan2)
        {
            if (ModelState.IsValid)
            {
                db.HoaDonBan2.Add(hoaDonBan2);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.MaSach = new SelectList(db.Sach2, "MaSach", "TenSach", hoaDonBan2.MaSach);
            ViewBag.MaKH = new SelectList(db.KhachHang2, "MaKH", "HoTen", hoaDonBan2.MaKH);
            return View(hoaDonBan2);
        }

        // GET: HoaDonBan2/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            HoaDonBan2 hoaDonBan2 = db.HoaDonBan2.Find(id);
            if (hoaDonBan2 == null)
            {
                return HttpNotFound();
            }
            ViewBag.MaSach = new SelectList(db.Sach2, "MaSach", "TenSach", hoaDonBan2.MaSach);
            ViewBag.MaKH = new SelectList(db.KhachHang2, "MaKH", "HoTen", hoaDonBan2.MaKH);
            return View(hoaDonBan2);
        }

        // POST: HoaDonBan2/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "MaHD,MaSach,MaKH,NgayBan,SoLuong")] HoaDonBan2 hoaDonBan2)
        {
            if (ModelState.IsValid)
            {
                db.Entry(hoaDonBan2).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.MaSach = new SelectList(db.Sach2, "MaSach", "TenSach", hoaDonBan2.MaSach);
            ViewBag.MaKH = new SelectList(db.KhachHang2, "MaKH", "HoTen", hoaDonBan2.MaKH);
            return View(hoaDonBan2);
        }

        // GET: HoaDonBan2/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            HoaDonBan2 hoaDonBan2 = db.HoaDonBan2.Find(id);
            if (hoaDonBan2 == null)
            {
                return HttpNotFound();
            }
            return View(hoaDonBan2);
        }

        // POST: HoaDonBan2/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            HoaDonBan2 hoaDonBan2 = db.HoaDonBan2.Find(id);
            db.HoaDonBan2.Remove(hoaDonBan2);
            db.SaveChanges();
            return RedirectToAction("Index");
        }
        //nhâp tổng giá cao nhất
        public ActionResult TopSellingBook()
        {
            // Include Sach2 when querying HoaDonBan2 to access related book details
            var hoaDonBan2 = db.HoaDonBan2.Include("Sach2");

            // Group by MaSach (book ID) and calculate total revenue
            var doanhThu = hoaDonBan2
                .GroupBy(hd => hd.MaSach)  // Group by book ID (MaSach)
                .Select(g => new
                {
                    MaSach = g.Key,
                    TenSach = g.FirstOrDefault().Sach2.TenSach,  // Get the book name from Sach2
                    DonGia = g.FirstOrDefault().Sach2.DonGia,  // Get the price of the book from Sach2
                    SoLuongTon = g.FirstOrDefault().Sach2.SoLuongTon,  // Get the stock quantity from Sach2
                    TongDoanhThu = g.Sum(hd => hd.Sach2.DonGia * hd.SoLuong)  // Calculate total revenue
                })
                .OrderByDescending(x => x.TongDoanhThu)  // Order by total revenue in descending order
                .FirstOrDefault();  // Get the book with the highest revenue

            if (doanhThu != null)
            {
                // Pass the data to the view
                ViewBag.TongDoanhThu = doanhThu.TongDoanhThu;
                var sach2 = db.Sach2.Find(doanhThu.MaSach);  // Find the book by its ID
                return View(sach2);  // Pass the book data to the view
            }

            // Return a view that says no data found if there are no sales
            return View("NoData");
        }

        public ActionResult TopQuantityInvoices()
        {
            var topInvoice = db.HoaDonBan2
                .GroupBy(hd => hd.MaHD)
                .Select(g => new
                {
                    MaHD = g.Key,
                    TenKhachHang = g.FirstOrDefault().KhachHang2.HoTen,
                    NgayBan = g.FirstOrDefault().NgayBan,
                    TotalQuantity = g.Sum(hd => hd.SoLuong),
                    SachDetails = g.Select(hd => new
                    {
                        TenSach = hd.Sach2.TenSach,
                        SoLuong = hd.SoLuong,
                        DonGia = hd.Sach2.DonGia,
                        ThanhTien = hd.SoLuong * hd.Sach2.DonGia
                    }).ToList()
                })
                .OrderByDescending(x => x.TotalQuantity)
                .FirstOrDefault();

            if (topInvoice == null)
            {
                return View("NoData");
            }

            return View(topInvoice);
        }
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}

///////////////////////Index//////////////
@model IEnumerable<Test2.Models.HoaDonBan2>

@{
    ViewBag.Title = "Index";
}

<!--<h2>Index</h2>

<p>
    @Html.ActionLink("Create New", "Create")
</p>
@using (Html.BeginForm("Index", "HoaDonBan2", FormMethod.Get))
{
    <p>
        Tìm kiếm theo tên khách hàng: @Html.TextBox("searchString", ViewBag.CurrentFilter as string, new { @class = "form-control", @placeholder = "Nhập tên khách hàng" })
        <input type="submit" value="Tìm kiếm" class="btn btn-primary" />
    </p>
}-->
<!-- Thông báo tìm kiếm -->
<!--@if (ViewBag.Message != null)
{
    <div class="alert alert-info">
        @ViewBag.Message
    </div>
}

<table class="table">
    <thead>
        <tr>
            <th>@Html.DisplayNameFor(model => model.MaHD)</th>
            <th>@Html.DisplayNameFor(model => model.MaSach)</th>
            <th>@Html.DisplayNameFor(model => model.MaKH)</th>
            <th>@Html.DisplayNameFor(model => model.NgayBan)</th>
            <th>@Html.DisplayNameFor(model => model.SoLuong)</th>
            <th>@Html.DisplayNameFor(model => model.KhachHang2.HoTen)</th>
            <th>@Html.DisplayNameFor(model => model.Sach2.TenSach)</th>
            <th>Thành tiền</th>
            <th>Thao tác</th>
        </tr>
    </thead>
    <tbody>
        @foreach (var item in Model)
        {
            <tr>
                <td>@Html.DisplayFor(modelItem => item.MaHD)</td>
                <td>@Html.DisplayFor(modelItem => item.MaSach)</td>
                <td>@Html.DisplayFor(modelItem => item.MaKH)</td>
                <td>@Html.DisplayFor(modelItem => item.NgayBan)</td>
                <td>@Html.DisplayFor(modelItem => item.SoLuong)</td>
                <td>@Html.DisplayFor(modelItem => item.KhachHang2.HoTen)</td>
                <td>@Html.DisplayFor(modelItem => item.Sach2.TenSach)</td>
                <td>
                    @((item.Sach2?.DonGia ?? 0) * item.SoLuong)
                </td>
                <td>
                    @Html.ActionLink("Edit", "Edit", new { id = item.MaHD }) |
                    @Html.ActionLink("Details", "Details", new { id = item.MaHD }) |
                    @Html.ActionLink("Delete", "Delete", new { id = item.MaHD })
                </td>
            </tr>
        }
    </tbody>
</table>-->
<h2>Index</h2>

<p>
    @Html.ActionLink("Create New", "Create")
</p>

@using (Html.BeginForm("Index", "HoaDonBan2", FormMethod.Get))
{
    <p>
        Tìm kiếm theo mã khách hàng:
        @Html.TextBox("searchString", ViewBag.CurrentFilter as string, new { @class = "form-control", @placeholder = "Nhập mã khách hàng (số)" })
        <input type="submit" value="Tìm kiếm" class="btn btn-primary" />
    </p>
}

<!-- Thông báo tìm kiếm -->
@if (ViewBag.Message != null)
{
    <div class="alert alert-info">
        @ViewBag.Message
    </div>
}

<table class="table">
    <thead>
        <tr>
            <th>@Html.DisplayNameFor(model => model.MaHD)</th>
            <th>@Html.DisplayNameFor(model => model.MaSach)</th>
            <th>@Html.DisplayNameFor(model => model.MaKH)</th>
            <th>@Html.DisplayNameFor(model => model.NgayBan)</th>
            <th>@Html.DisplayNameFor(model => model.SoLuong)</th>
            <th>@Html.DisplayNameFor(model => model.KhachHang2.HoTen)</th>
            <th>@Html.DisplayNameFor(model => model.Sach2.TenSach)</th>
            <th>Thành tiền</th>
            <th>Thao tác</th>
        </tr>
    </thead>
    <tbody>
        @foreach (var item in Model)
        {
            <tr>
                <td>@Html.DisplayFor(modelItem => item.MaHD)</td>
                <td>@Html.DisplayFor(modelItem => item.MaSach)</td>
                <td>@Html.DisplayFor(modelItem => item.MaKH)</td>
                <td>@Html.DisplayFor(modelItem => item.NgayBan)</td>
                <td>@Html.DisplayFor(modelItem => item.SoLuong)</td>
                <td>@Html.DisplayFor(modelItem => item.KhachHang2.HoTen)</td>
                <td>@Html.DisplayFor(modelItem => item.Sach2.TenSach)</td>
                <td>
                    @((item.Sach2?.DonGia ?? 0) * item.SoLuong)
                </td>
                <td>
                    @Html.ActionLink("Edit", "Edit", new { id = item.MaHD }) |
                    @Html.ActionLink("Details", "Details", new { id = item.MaHD }) |
                    @Html.ActionLink("Delete", "Delete", new { id = item.MaHD })
                </td>
            </tr>
        }
    </tbody>
</table>
/////////////////////TopSellingBook////////////////////
@model Test2.Models.Sach2
@{
    ViewBag.Title = "TopSellingBook";
}

<h2>Sách có tổng doanh thu cao nhất</h2>

@if (Model != null)
{
    <table class="table">
        <tr>
            <th>@Html.DisplayNameFor(model => model.MaSach)</th>
            <th>@Html.DisplayNameFor(model => model.TenSach)</th>
            <th>@Html.DisplayNameFor(model => model.TheLoai)</th>
            <th>@Html.DisplayNameFor(model => model.DonGia)</th>
            <th>@Html.DisplayNameFor(model => model.SoLuongTon)</th>
            <th>Tổng Doanh Thu</th>
        </tr>
        <tr>
            <td>@Html.DisplayFor(model => model.MaSach)</td>
            <td>@Html.DisplayFor(model => model.TenSach)</td>
            <td>@Html.DisplayFor(model => model.TheLoai)</td>
            <td>@Html.DisplayFor(model => model.DonGia)</td>
            <td>@Html.DisplayFor(model => model.SoLuongTon)</td>
            <td>@ViewBag.TongDoanhThu</td>
        </tr>
    </table>
}
else
{
    <p>Không có dữ liệu hóa đơn để tính doanh thu.</p>
}


///////////////////////////////Hóa Đơn Có Số Lượng Nhiều Nhất/////////////////
@model dynamic

@{
    ViewBag.Title = "Hóa Đơn Có Số Lượng Nhiều Nhất";
}

<h2>Hóa Đơn Có Số Lượng Nhiều Nhất</h2>

@if (Model != null)
{
    <table class="table table-bordered">
        <thead>
            <tr>
                <th>Mã Hóa Đơn</th>
                <th>Tên Khách Hàng</th>
                <th>Ngày Bán</th>
                <th>Tổng Số Lượng</th>
                <th>Chi Tiết Hóa Đơn</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>@Model.MaHD</td>
                <td>@Model.TenKhachHang</td>
                <td>@Model.NgayBan.ToString("dd/MM/yyyy")</td>
                <td>@Model.TotalQuantity</td>
                <td>
                    <ul>
                        @foreach (var item in Model.SachDetails)
                        {
                            <li>
                                @item.TenSach - Số Lượng: @item.SoLuong - Đơn Giá: @item.DonGia.ToString("C") - Thành Tiền: @item.ThanhTien.ToString("C")
                            </li>
                        }
                    </ul>
                </td>
            </tr>
        </tbody>
    </table>
}
else
{
    <p>Không có dữ liệu để hiển thị.</p>
}

////////////////////////Sach//////////
//////////////Create///////////////
@model Test2.Models.Sach2

@{
    ViewBag.Title = "Create";
}

<h2>Create</h2>


@using (Html.BeginForm()) 
{
    @Html.AntiForgeryToken()
    
<div class="form-horizontal">
    <h4>Sach2</h4>
    <hr />
    @Html.ValidationSummary(true, "", new { @class = "text-danger" })
    <div class="form-group">
        @Html.LabelFor(model => model.MaSach, htmlAttributes: new { @class = "control-label col-md-2" })
        <div class="col-md-10">
            @Html.EditorFor(model => model.MaSach, new { htmlAttributes = new { @class = "form-control" } })
            @Html.ValidationMessageFor(model => model.MaSach, "", new { @class = "text-danger" })
        </div>
    </div>

    <div class="form-group">
        @Html.LabelFor(model => model.TenSach, htmlAttributes: new { @class = "control-label col-md-2" })
        <div class="col-md-10">
            @Html.EditorFor(model => model.TenSach, new { htmlAttributes = new { @class = "form-control" } })
            @Html.ValidationMessageFor(model => model.TenSach, "", new { @class = "text-danger" })
        </div>
    </div>

    <div class="form-group">
        @Html.LabelFor(model => model.TheLoai, htmlAttributes: new { @class = "control-label col-md-2" })
        <div class="col-md-10">
            @Html.DropDownList("TheLoai", null, "Chọn thể loại", new { @class = "form-control" })
            @Html.ValidationMessageFor(model => model.TheLoai, "", new { @class = "text-danger" })
        </div>
    </div>

    <div class="form-group">
        @Html.LabelFor(model => model.DonGia, htmlAttributes: new { @class = "control-label col-md-2" })
        <div class="col-md-10">
            @Html.EditorFor(model => model.DonGia, new { htmlAttributes = new { @class = "form-control" } })
            @Html.ValidationMessageFor(model => model.DonGia, "", new { @class = "text-danger" })
        </div>
    </div>

    <div class="form-group">
        @Html.LabelFor(model => model.SoLuongTon, htmlAttributes: new { @class = "control-label col-md-2" })
        <div class="col-md-10">
            @Html.EditorFor(model => model.SoLuongTon, new { htmlAttributes = new { @class = "form-control" } })
            @Html.ValidationMessageFor(model => model.SoLuongTon, "", new { @class = "text-danger" })
        </div>
    </div>

    <div class="form-group">
        <div class="col-md-offset-2 col-md-10">
            <input type="submit" value="Create" class="btn btn-default" />
        </div>
    </div>
</div>
}

<div>
    @Html.ActionLink("Back to List", "Index")
</div>

@section Scripts {
    @Scripts.Render("~/bundles/jqueryval")
}

////////////////////////edit////////////////
@model Test2.Models.Sach2

@{
    ViewBag.Title = "Edit";
}

<h2>Edit</h2>


@using (Html.BeginForm())
{
    @Html.AntiForgeryToken()
    
<div class="form-horizontal">
    <h4>Sach2</h4>
    <hr />
    @Html.ValidationSummary(true, "", new { @class = "text-danger" })
    @Html.HiddenFor(model => model.MaSach)

    <div class="form-group">
        @Html.LabelFor(model => model.TenSach, htmlAttributes: new { @class = "control-label col-md-2" })
        <div class="col-md-10">
            @Html.EditorFor(model => model.TenSach, new { htmlAttributes = new { @class = "form-control" } })
            @Html.ValidationMessageFor(model => model.TenSach, "", new { @class = "text-danger" })
        </div>
    </div>

    <div class="form-group">
        @Html.LabelFor(model => model.TheLoai, htmlAttributes: new { @class = "control-label col-md-2" })
        <div class="col-md-10">
            @Html.DropDownList("TheLoai", null, "Chọn thể loại", new { @class = "form-control" })
            @Html.ValidationMessageFor(model => model.TheLoai, "", new { @class = "text-danger" })
        </div>
    </div>

    <div class="form-group">
        @Html.LabelFor(model => model.DonGia, htmlAttributes: new { @class = "control-label col-md-2" })
        <div class="col-md-10">
            @Html.EditorFor(model => model.DonGia, new { htmlAttributes = new { @class = "form-control" } })
            @Html.ValidationMessageFor(model => model.DonGia, "", new { @class = "text-danger" })
        </div>
    </div>

    <div class="form-group">
        @Html.LabelFor(model => model.SoLuongTon, htmlAttributes: new { @class = "control-label col-md-2" })
        <div class="col-md-10">
            @Html.EditorFor(model => model.SoLuongTon, new { htmlAttributes = new { @class = "form-control" } })
            @Html.ValidationMessageFor(model => model.SoLuongTon, "", new { @class = "text-danger" })
        </div>
    </div>

    <div class="form-group">
        <div class="col-md-offset-2 col-md-10">
            <input type="submit" value="Save" class="btn btn-default" />
        </div>
    </div>
</div>
}

<div>
    @Html.ActionLink("Back to List", "Index")
</div>

@section Scripts {
    @Scripts.Render("~/bundles/jqueryval")
}


//////////////De có 2 Khóa//////////////
///////////////SinhVien/////////////
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using _71_LTUDDN_NguyenTuanVu_DHTI15A1ND.Models;

namespace _71_LTUDDN_NguyenTuanVu_DHTI15A1ND.Controllers
{
    public class SinhViensController : Controller
    {
        private QLSVDataContext db = new QLSVDataContext();

        // GET: SinhViens
        // GET: SinhViens
        public ActionResult Index(string tenSinhVien)
        {
            var sinhViens = from sv in db.SinhViens
                            select sv;

            // Kiểm tra nếu có tham số tìm kiếm
            if (!string.IsNullOrEmpty(tenSinhVien))
            {
                sinhViens = sinhViens.Where(s => s.hoten.Contains(tenSinhVien));
            }

            return View(sinhViens.ToList());
        }

        // GET: SinhViens/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            SinhVien sinhVien = db.SinhViens.Find(id);
            if (sinhVien == null)
            {
                return HttpNotFound();
            }
            return View(sinhVien);
        }

        // GET: SinhViens/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: SinhViens/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "masv,hoten,namsinh,gioitinh,email")] SinhVien sinhVien)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    db.SinhViens.Add(sinhVien);
                    db.SaveChanges();
                    return RedirectToAction("Index");
                }
                catch (DbUpdateException ex)
                {
                    ModelState.AddModelError("", "Lỗi khi thêm sinh viên: " + ex.InnerException?.Message);
                }
            }

            return View(sinhVien);
        }



        // GET: SinhViens/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            SinhVien sinhVien = db.SinhViens.Find(id);
            if (sinhVien == null)
            {
                return HttpNotFound();
            }
            return View(sinhVien);
        }

        // POST: SinhViens/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "masv,hoten,namsinh,gioitinh,email")] SinhVien sinhVien)
        {
            if (ModelState.IsValid)
            {
                db.Entry(sinhVien).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(sinhVien);
        }

        // GET: SinhViens/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            SinhVien sinhVien = db.SinhViens.Find(id);
            if (sinhVien == null)
            {
                return HttpNotFound();
            }
            return View(sinhVien);
        }

        // POST: SinhViens/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            // Tìm sinh viên theo id
            var sinhVien = db.SinhViens.Include("Diems").FirstOrDefault(s => s.masv == id);

            if (sinhVien == null)
            {
                return HttpNotFound();
            }

            // Xóa các bản ghi trong bảng Diem liên quan đến sinh viên
            foreach (var diem in sinhVien.Diems.ToList())
            {
                db.Diems.Remove(diem);
            }

            // Xóa sinh viên
            db.SinhViens.Remove(sinhVien);
            db.SaveChanges();

            return RedirectToAction("Index");
        }


        // GET: SinhViens/TimKiemDiem
        public ActionResult TimKiemDiem(string tenSinhVien)
        {
            if (string.IsNullOrEmpty(tenSinhVien))
            {
                return View(new List<Diem>()); // Trả về view trống nếu không nhập tên
            }

            var ketQua = db.Diems
                .Join(db.SinhViens,
                    d => d.masv,
                    sv => sv.masv,
                    (d, sv) => new { d, sv })
                .Where(x => x.sv.hoten.Contains(tenSinhVien))
                .Select(x => new Diem
                {
                    masv = x.d.masv,
                    tenmh = x.d.tenmh,
                    diem1 = x.d.diem1,
                })
                .ToList();

            return View(ketQua);
        }

        // GET: SinhViens/DiemKyThuatLapTrinhThapNhat
        public ActionResult DiemKyThuatLapTrinhThapNhat()
        {
            var monKyThuatLapTrinh = "Kỹ thuật lập trình";

            var diemThapNhat = db.Diems
                .Where(d => d.tenmh == monKyThuatLapTrinh)
                .OrderBy(d => d.diem1)
                .FirstOrDefault();

            if (diemThapNhat == null)
            {
                return View(); // Không có kết quả
            }

            var sinhVien = db.SinhViens.Find(diemThapNhat.masv);

            var ketQua = new
            {
                hoten = sinhVien?.hoten,
                tenmh = diemThapNhat.tenmh,
                diem1 = diemThapNhat.diem1
            };

            return View(ketQua);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}

///////////////////////index///////////
@model IEnumerable<_71_LTUDDN_NguyenTuanVu_DHTI15A1ND.Models.SinhVien>

@{
    ViewBag.Title = "Index";
}

<h2>Index</h2>

<!-- Form tìm kiếm -->
<p>
    @using (Html.BeginForm("Index", "SinhViens", FormMethod.Get))
    {
        <label for="search">Tìm kiếm sinh viên:</label>
        <input type="text" id="search" name="tenSinhVien" placeholder="Nhập tên sinh viên" class="form-control" style="width: 300px; display: inline-block;" />
        <button type="submit" class="btn btn-primary">Tìm kiếm</button>
    }
</p>

<!-- Liên kết tạo mới -->
<p>
    @Html.ActionLink("Create New", "Create", null, new { @class = "btn btn-success" })
</p>

<!-- Bảng hiển thị danh sách sinh viên -->
<table class="table">
    <tr>
        <th>
            @Html.DisplayNameFor(model => model.hoten)
        </th>
        <th>
            @Html.DisplayNameFor(model => model.namsinh)
        </th>
        <th>
            @Html.DisplayNameFor(model => model.gioitinh)
        </th>
        <th>
            @Html.DisplayNameFor(model => model.email)
        </th>
        <th></th>
    </tr>

    @foreach (var item in Model)
    {
        <tr>
            <td>
                @Html.DisplayFor(modelItem => item.hoten)
            </td>
            <td>
                @Html.DisplayFor(modelItem => item.namsinh)
            </td>
            <td>
                @Html.DisplayFor(modelItem => item.gioitinh)
            </td>
            <td>
                @Html.DisplayFor(modelItem => item.email)
            </td>
            <td>
                @Html.ActionLink("Edit", "Edit", new { id = item.masv }) |
                @Html.ActionLink("Details", "Details", new { id = item.masv }) |
                @Html.ActionLink("Delete", "Delete", new { id = item.masv })
            </td>
        </tr>
    }
</table>

<!-- Nút quay lại danh sách -->
<p>
    @Html.ActionLink("Back to List", "Index", null, new { @class = "btn btn-secondary" })
</p>

////////////////////////timKiem////////////
@model IEnumerable<dynamic>

<h2>Danh sách điểm các môn học</h2>
<form method="get" action="@Url.Action("TimKiemDiem", "SinhViens")">
    <input type="text" name="tenSinhVien" placeholder="Nhập tên sinh viên" />
    <button type="submit">Tìm kiếm</button>
</form>

<table class="table">
    <thead>
        <tr>
            <th>Tên sinh viên</th>
            <th>Môn học</th>
            <th>Điểm</th>
        </tr>
    </thead>
    <tbody>
        @foreach (var item in Model)
        {
            <tr>
                <td>@item.hoten</td>
                <td>@item.tenmh</td>
                <td>@item.diem</td>
            </tr>
        }
    </tbody>
</table>

//////////////////Sinh viên có điểm Kỹ thuật lập trình thấp nhất/////////////
@model dynamic

<h2>Sinh viên có điểm Kỹ thuật lập trình thấp nhất</h2>
@if (Model != null)
{
    <table class="table">
        <tr>
            <th>Tên sinh viên</th>
            <td>@Model.hoten</td>
        </tr>
        <tr>
            <th>Môn học</th>
            <td>@Model.tenmh</td>
        </tr>
        <tr>
            <th>Điểm</th>
            <td>@Model.diem</td>
        </tr>
    </table>
}
else
{
    <p>Không tìm thấy thông tin.</p>
}

///////////////////Diem////////////////////////
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using _71_LTUDDN_NguyenTuanVu_DHTI15A1ND.Models;

namespace _71_LTUDDN_NguyenTuanVu_DHTI15A1ND.Controllers
{
    public class DiemsController : Controller
    {
        private QLSVDataContext db = new QLSVDataContext();

        // GET: Diems
        public ActionResult Index()
        {
            var diems = db.Diems.Include(d => d.SinhVien);
            return View(diems.ToList());
        }

        // GET: Diems/Details/5
        public ActionResult Details(int? id, string id2)
        {
            if (id == null || id2 == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Diem diem = db.Diems.Find(id, id2);
            if (diem == null)
            {
                return HttpNotFound();
            }
            return View(diem);
        }

        // GET: Diems/Create
        public ActionResult Create()
        {
            ViewBag.masv = new SelectList(db.SinhViens, "masv", "hoten");
            return View();
        }

        // POST: Diems/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "masv,tenmh,diem1")] Diem diem)
        {
            if (ModelState.IsValid)
            {
                db.Diems.Add(diem);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.masv = new SelectList(db.SinhViens, "masv", "hoten", diem.masv);
            return View(diem);
        }

        // GET: Diems/Edit/5
        public ActionResult Edit(int? id, string id2)
        {
            if (id == null || id2 == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Diem diem = db.Diems.Find(id, id2);
            if (diem == null)
            {
                return HttpNotFound();
            }
            ViewBag.masv = new SelectList(db.SinhViens, "masv", "hoten", diem.masv);
            return View(diem);
        }

        // POST: Diems/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "masv,tenmh,diem1")] Diem diem)
        {
            if (ModelState.IsValid)
            {
                db.Entry(diem).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.masv = new SelectList(db.SinhViens, "masv", "hoten", diem.masv);
            return View(diem);
        }

        // GET: Diems/Delete/5
        public ActionResult Delete(int? id, string id2)
        {
            if (id == null || id2 == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Diem diem = db.Diems.Find(id, id2);
            if (diem == null)
            {
                return HttpNotFound();
            }
            return View(diem);
        }

        // POST: Diems/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id, string id2)
        {
            Diem diem = db.Diems.Find(id, id2);
            db.Diems.Remove(diem);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}

/////////////////////Create//////////////////
@model _71_LTUDDN_NguyenTuanVu_DHTI15A1ND.Models.Diem

@{
    ViewBag.Title = "Create";
}

<h2>Create</h2>


@using (Html.BeginForm()) 
{
    @Html.AntiForgeryToken()
    
    <div class="form-horizontal">
        <h4>Diem</h4>
        <hr />
        @Html.ValidationSummary(true, "", new { @class = "text-danger" })
        <div class="form-group">
            @Html.LabelFor(model => model.masv, "masv", htmlAttributes: new { @class = "control-label col-md-2" })
            <div class="col-md-10">
                @Html.DropDownList("masv", null, htmlAttributes: new { @class = "form-control" })
                @Html.ValidationMessageFor(model => model.masv, "", new { @class = "text-danger" })
            </div>
        </div>

        <div class="form-group">
            @Html.LabelFor(model => model.tenmh, htmlAttributes: new { @class = "control-label col-md-2" })
            <div class="col-md-10">
                @Html.EditorFor(model => model.tenmh, new { htmlAttributes = new { @class = "form-control" } })
                @Html.ValidationMessageFor(model => model.tenmh, "", new { @class = "text-danger" })
            </div>
        </div>

        <div class="form-group">
            @Html.LabelFor(model => model.diem1, htmlAttributes: new { @class = "control-label col-md-2" })
            <div class="col-md-10">
                @Html.EditorFor(model => model.diem1, new { htmlAttributes = new { @class = "form-control" } })
                @Html.ValidationMessageFor(model => model.diem1, "", new { @class = "text-danger" })
            </div>
        </div>

        <div class="form-group">
            <div class="col-md-offset-2 col-md-10">
                <input type="submit" value="Create" class="btn btn-default" />
            </div>
        </div>
    </div>
}

<div>
    @Html.ActionLink("Back to List", "Index")
</div>

@section Scripts {
    @Scripts.Render("~/bundles/jqueryval")
}

/////////////////////////////edit/////////////////
@model _71_LTUDDN_NguyenTuanVu_DHTI15A1ND.Models.Diem

@{
    ViewBag.Title = "Edit";
}

<h2>Edit</h2>


@using (Html.BeginForm())
{
    @Html.AntiForgeryToken()
    
    <div class="form-horizontal">
        <h4>Diem</h4>
        <hr />
        @Html.ValidationSummary(true, "", new { @class = "text-danger" })
        @Html.HiddenFor(model => model.masv)

        @Html.HiddenFor(model => model.tenmh)

        <div class="form-group">
            @Html.LabelFor(model => model.diem1, htmlAttributes: new { @class = "control-label col-md-2" })
            <div class="col-md-10">
                @Html.EditorFor(model => model.diem1, new { htmlAttributes = new { @class = "form-control" } })
                @Html.ValidationMessageFor(model => model.diem1, "", new { @class = "text-danger" })
            </div>
        </div>

        <div class="form-group">
            <div class="col-md-offset-2 col-md-10">
                <input type="submit" value="Save" class="btn btn-default" />
            </div>
        </div>
    </div>
}

<div>
    @Html.ActionLink("Back to List", "Index")
</div>

@section Scripts {
    @Scripts.Render("~/bundles/jqueryval")
}
