import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { ClienteListarComponent } from './cliente-listar.component';
import { ClienteService, Cliente, ClienteIdPipe } from '../';
import { ModalUtilComponent, KzPaginacaoComponent, RouterLinkStubDirective, ActivatedRouteStub } from '../../';

describe('ClienteListar', () => {
	let fixture: ComponentFixture<ClienteListarComponent>;
	let de: DebugElement;
	let el: HTMLElement;
	let clienteService: ClienteService;
	let clientes: Cliente[] = [
		new Cliente(1234567890123, 'Fulano'),
		new Cliente(3210987654321, 'Ciclano')
	]

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [
				ClienteListarComponent,
				ModalUtilComponent,
				KzPaginacaoComponent,
				RouterLinkStubDirective,
				ClienteIdPipe
			],
			providers: [
				ClienteService,
				{
					provide: ActivatedRoute,
					useValue: new ActivatedRouteStub()
				}
			]
		});

		fixture = TestBed.createComponent(ClienteListarComponent);

		// Mock ClienteService
		clienteService = TestBed.get(ClienteService);
		spyOn(clienteService, 'totalRegistros').and.returnValue(2);
		spyOn(clienteService, 'listarParcial').and.returnValue(clientes);
	});

	it ('Should verify if title was correctly defined', () => {
		fixture.detectChanges();

		de = fixture.debugElement.query(By.css('h1'));
		el = de.nativeElement;

		expect(el.textContent).toContain('Listagem de Clientes');
	});

	it ('Should verify number of table lines', () => {
		fixture.detectChanges();

		let des: DebugElement[] = fixture.debugElement.queryAll(By.css('table > tbody > tr'));

		expect(clienteService.listarParcial).toHaveBeenCalled();
		expect(clienteService.listarParcial).toHaveBeenCalledTimes(1);
		expect(des.length).toEqual(3);
	});

	it ('Should certify if ID was been formatted', () => {
		fixture.detectChanges();

		let des: DebugElement[] = fixture.debugElement.queryAll(By.css('table > tbody > tr'));
		let elem1 = des[1].children[0].nativeElement;
		let elem2 = des[2].children[0].nativeElement;

		expect(elem1.textContent).toContain('1234-5678901/23');
		expect(elem2.textContent).toContain('3210-9876543/21');
	});

	it ('Should verify if customer name is correct', () => {
		fixture.detectChanges();

		let des: DebugElement[] = fixture.debugElement.queryAll(By.css('table > tbody > tr'));
		let elem1 = des[1].children[1].nativeElement;
		let elem2 = des[2].children[1].nativeElement;

		expect(elem1.textContent).toContain('Fulano');
		expect(elem2.textContent).toContain('Ciclano');
	});

	it ('Should verify if pagination exists', () => {
		fixture.detectChanges();

		de = fixture.debugElement.query(By.css('kz-paginacao'));
		
		expect(de.nativeElement).toBeDefined();
	});
});