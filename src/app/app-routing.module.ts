import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ListTaskComponent } from "./pages/list-task/list-task.component";
import { DetailTaskComponent } from "./pages/detail-task/detail-task.component";

const appRoutes: Routes = [
	{ path: "tasks", component: ListTaskComponent },
	{ path: "detail", component: DetailTaskComponent },
	{ path: "detail/:taskId", component: DetailTaskComponent },
	{ path: "**", redirectTo: "/tasks", pathMatch: "full" },
];

@NgModule({
	imports: [RouterModule.forRoot(appRoutes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
