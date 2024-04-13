import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BackendService } from "./backend.service";
import { DetailTaskComponent } from "./pages/detail-task/detail-task.component";
import { ListTaskComponent } from "./pages/list-task/list-task.component";
import { TaskStatusPipe } from "./pipes/task-status.pipe";
import { UserNamePipe } from "./pipes/user-name.pipe";

@NgModule({
	declarations: [
		AppComponent,
		ListTaskComponent,
		DetailTaskComponent,
		UserNamePipe,
		TaskStatusPipe,
	],
	imports: [AppRoutingModule, BrowserModule, ReactiveFormsModule],
	providers: [BackendService],
	bootstrap: [AppComponent],
})
export class AppModule {}
