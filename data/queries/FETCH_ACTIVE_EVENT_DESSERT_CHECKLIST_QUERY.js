export const FETCH_ACTIVE_EVENT_DESSERT_CHECKLIST_QUERY = `
*[_type == 'eventDessertChecklist' && isActive == true] {
"logoUrl": logo.asset->url,
  "step1": {
    "title": step1.title,
    "steps": step1.steps[]{
      step
    }
  },
  "step2": {
    "title": step2.title,
    "steps": step2.steps[]{
      step
    }
  },
  "step3": {
    "title": step3.title,
    "steps": step3.steps[]{
      step
    }
  }
}
`;
