# features

Must be:
* injectable
* ejectable
* tolerant to the absence of non-injected features
* technology-agnostic

# services

Must be:
* injectable inside a component
* mockable

Answer this:
* support services depending on other services
* provide a way to mock services

Dans Angular ça ressemble à ça

{
  components: {
    A,
    B,
  },
  services: {
    dashboardService: DashboardService,
  },
}

@Component({
  components: {
    A,
    B,
  },
})
class MyComponent extends Vue {
  @Service
  readonly httpRequestService: HttpRequestService;

  async logIn(username: string, password: string) {
    await this.httpRequestService.post('/login', { username, password });
  }
}

<!-- class Component {
  constructor(
    private dashboardService: DashboardService,
    private httpRequestService: HttpRequestService,
  ) {}

  constructor(
    dashboardService: DashboardService,
    httpRequestService: HttpRequestService,
  ) {
    this.dashboardService = dashboardService
    this.httpRequestService = httpRequestService
  }
} -->
