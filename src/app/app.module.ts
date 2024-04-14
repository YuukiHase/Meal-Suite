import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BackendService } from "./backend.service";
import { DetailTaskComponent } from "./pages/detail-task/detail-task.component";
import { ListTaskComponent } from "./pages/list-task/list-task.component";
import { TaskStatusPipe } from "./pipes/task-status.pipe";

@NgModule({
	declarations: [
		AppComponent,
		ListTaskComponent,
		DetailTaskComponent,
		TaskStatusPipe,
	],
	imports: [
		AppRoutingModule,
		BrowserModule,
		ReactiveFormsModule,
		BrowserAnimationsModule,
		MatButtonModule,
		MatInputModule,
		MatIconModule,
		MatSelectModule,
		MatRadioModule,
		MatProgressSpinnerModule,
		MatProgressBarModule,
		MatCardModule,
	],
	providers: [BackendService],
	bootstrap: [AppComponent],
})
export class AppModule {}
