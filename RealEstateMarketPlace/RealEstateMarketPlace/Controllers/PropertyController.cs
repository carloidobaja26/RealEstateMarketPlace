using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace RealEstateMarketPlace.Controllers
{
    public class PropertyController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult PropertyDetails()
        {
            return View();
        }
    }
}