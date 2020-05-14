import { NgModule } from '@angular/core';
import { SubcomponentComponent } from './subcomponent/subcomponent';
import { Subcomponent2Component } from './subcomponent2/subcomponent2';
@NgModule({
	declarations: [SubcomponentComponent,
    Subcomponent2Component],
	imports: [],
	exports: [SubcomponentComponent,
    Subcomponent2Component]
})
export class ComponentsModule {}
