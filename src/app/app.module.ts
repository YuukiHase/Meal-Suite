import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BackendService } from "./backend.service";
import { ListTaskComponent } from "./pages/list-task/list-task.component";
import { DetailTaskComponent } from "./pages/detail-task/detail-task.component";
import { AppRoutingModule } from "./app-routing.module";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
	declarations: [AppComponent, ListTaskComponent, DetailTaskComponent],
	imports: [AppRoutingModule, BrowserModule, ReactiveFormsModule],
	providers: [BackendService],
	bootstrap: [AppComponent],
})
export class AppModule {}
