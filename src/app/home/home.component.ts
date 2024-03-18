import { Component } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone:true,
  imports:[CarouselModule]
})



export class HomeComponent {

  images = [
    {  name:'image', content: '../assets/hlaptop.png',  },
    { name:'image', content:  '../assets/iphoney.png', },
    {name:'image', content: '../assets/headset.png',  },
    {  name:'image', content: '../assets/vision.png',  },

  ];

}

