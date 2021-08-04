export function singletonInitializer(ref, Service) {
  let newService = ref;
  if (!newService) {
    newService = new Service();
  }
  return newService;
}

export default singletonInitializer;
