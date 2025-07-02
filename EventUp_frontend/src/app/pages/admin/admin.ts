import { Component, OnInit } from '@angular/core';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: false,
  templateUrl: './admin.html',
  styleUrls: []
})
export class Admin implements OnInit{
  userFirstname: string = '';
  constructor(private authService: Auth, private router:Router) {}

logout(): void {
  this.authService.logout();
}
   ngOnInit(): void {
    const userData = localStorage.getItem('user');
if (userData) {
  const user = JSON.parse(userData);
  this.userFirstname = user.firstname;
}
    if (!this.authService.isLoggedIn()) {
    this.router.navigate(['/login']);
  }
    const styles = [
      'assets/admin/css/bootstrap.min.css',
      'assets/admin/css/demo.css',
      'assets/admin/css/fonts.css',
      'assets/admin/css/fonts.min.css',
      'assets/admin/css/kaiadmin.css',
      'assets/admin/css/kaiadmin.min.css',
      'assets/admin/css/plugins.css',
      'assets/admin/css/plugins.min.css'
    ];
const scripts = [
      'assets/admin/js/core/jquery-3.7.1.min.js',
      'assets/admin/js/core/popper.min.js',
      'assets/admin/js/core/bootstrap.min.js',
      'assets/admin/js/kaiaadmin.js',
      'assets/admin/js/kaiaadmin.min.js',
      'assets/admin/js/demo.js',
      'assets/admin/js/setting-demo.js',
      'assets/admin/js/setting-demo2.js',
      'assets/admin/js/plugin/bootstrap-notify/bootstrap-notify.min.js',
      'assets/admin/js/plugin/bootstrap-tagsinput/bootstrap-tagsinput.min.js',
      'assets/admin/js/plugin/bootstrap-toggle/bootstrap-toggle.min.js',
      'assets/admin/js/plugin/chart-circle/circles.min.js',
      'assets/admin/js/plugin/chart.js/chart.min.js',
      'assets/admin/js/plugin/datatables/datatables.min.js',
      'assets/admin/js/plugin/datepicker/bootstrap-datetimepicker.min.js',
      'assets/admin/js/plugin/dropzone/dropzone.min.js',
      'assets/admin/js/plugin/fullcalendar/fullcalendar.min.js',
      'assets/admin/js/plugin/gmaps/gmaps.js',
      'assets/admin/js/plugin/jquery-scrollbar/jquery.scrollbar.min.js',
      'assets/admin/js/plugin/jquery.magnific-popup/jquery.magnific-popup.min.js',
      'assets/admin/js/plugin/jquery.sparkline/jquery.sparkline.min.js',
      'assets/admin/js/plugin/jquery.validate/jquery.validate.min.js',
      'assets/admin/js/plugin/jsvectormap/jsvectormap.min.js',
      'assets/admin/js/plugin/jsvectormap/world.js',
      'assets/admin/js/plugin/list.js/list.min.js',
      'assets/admin/js/plugin/moment/moment.min.js',
      'assets/admin/js/plugin/owl-carousel/owl.carousel.min.js',
      'assets/admin/js/plugin/select2/select2.full.min.js',
      'assets/admin/js/plugin/sortable/sortable.min.js',
      'assets/admin/js/plugin/sticky-sidebar/sticky-sidebar.min.js',
      'assets/admin/js/plugin/summernote/summernote-lite.min.js',
      'assets/admin/js/plugin/sweetalert/sweetalert.min.js',
      'assets/admin/js/plugin/webfont/webfont.min.js'
    ];
    styles.forEach(href => this.loadStyle(href));

    scripts.forEach(src => this.loadScript(src));
  
  }
   private loadStyle(href: string): void {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  }
    private loadScript(src: string): void {
    const script = document.createElement('script');
    script.src = src;
    script.async = false;
    script.defer = true;
    document.body.appendChild(script);
  }

   

}
