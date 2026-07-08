import { useQueryClient } from "@tanstack/react-query"

export function useInvalidateData() {
  const queryClient = useQueryClient()

  const invalidateAll = () => {
    return queryClient.invalidateQueries({
      predicate: (query) =>
        ['calories-intake-info', 'weekly-stats', 'history-stats', 'recent-meals', 'meal-log', 'log-pages']
        .includes(query.queryKey[0] as string)
    })  
  }

  return { invalidateAll }
}
