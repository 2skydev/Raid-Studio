import { ComponentProps, Suspense } from 'react'

import { Loader2Icon } from 'lucide-react'

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import {
  Form,
  FormHeader,
  FormLabel,
  FormField,
  FormItem,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form'
import { Separator } from '@/components/ui/separator'

import SelectMultiple from '@/components/SelectMultiple'
import VerticalTabsTemplate from '@/components/VerticalTabsTemplate'

import RaidRoot from '@/features/raid/RaidRoot'

import { RAIDS_ARRAY_GROUP_BY_NAME } from '@/assets/data/raid'
import useCustomForm from '@/hooks/useCustomForm'

export interface CharacterConfigDrawerProps
  extends Omit<ComponentProps<typeof Drawer>, 'children' | 'fadeFromIndex'> {
  characterName: string
}

const CharacterConfigDrawer = ({ characterName, ...props }: CharacterConfigDrawerProps) => {
  const form = useCustomForm<{
    selectedRaidNames: string[]
  }>({
    defaultValues: {
      selectedRaidNames: [],
    },
  })

  const selectedRaidNames = form.watch('selectedRaidNames')

  const handleChangeSelectedRaidNames = (values: string[]) => {
    if (values.length > 3) return
    form.setValue('selectedRaidNames', values)
  }

  return (
    <Drawer {...props}>
      <DrawerContent className="h-[90%] px-10">
        <div className="container pt-8">
          <DrawerHeader className="p-0">
            <DrawerTitle>캐릭터 설정 - {characterName}</DrawerTitle>
            <DrawerDescription>
              해당 캐릭터의 대한 설정을 변경 및 확인할 수 있습니다
            </DrawerDescription>
          </DrawerHeader>

          <Separator className="my-6" />

          <VerticalTabsTemplate defaultValue="todo">
            <VerticalTabsTemplate.List className="w-56">
              <VerticalTabsTemplate.Trigger value="todo">
                레이드 숙제 설정
              </VerticalTabsTemplate.Trigger>
              <VerticalTabsTemplate.Trigger value="etc">기타 설정</VerticalTabsTemplate.Trigger>
            </VerticalTabsTemplate.List>

            <VerticalTabsTemplate.Content className="min-h-80 w-full max-w-2xl" value="todo">
              <Form form={form}>
                <FormField
                  control={form.control}
                  name="selectedRaidNames"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>레이드 숙제</FormLabel>

                      <FormDescription>
                        최대 3개의 숙제를 미리 지정하거나 자동으로 구성할 수 있습니다
                      </FormDescription>

                      <FormControl>
                        <SelectMultiple
                          values={field.value}
                          onValuesChange={handleChangeSelectedRaidNames}
                        >
                          <SelectMultiple.Trigger className="w-80">
                            <SelectMultiple.Value placeholder="레이드를 선택해주세요" />
                          </SelectMultiple.Trigger>

                          <SelectMultiple.Content>
                            {RAIDS_ARRAY_GROUP_BY_NAME.map(item => (
                              <SelectMultiple.Item key={item.name} value={item.name}>
                                {item.name}
                              </SelectMultiple.Item>
                            ))}
                          </SelectMultiple.Content>
                        </SelectMultiple>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Suspense fallback={<Loader2Icon className="animate-spin" />}>
                  <div className="space-y-4">
                    {selectedRaidNames.map(name => (
                      <RaidRoot key={name} name={name} />
                    ))}
                  </div>
                </Suspense>
              </Form>
            </VerticalTabsTemplate.Content>

            <VerticalTabsTemplate.Content className="min-h-80 w-full max-w-2xl" value="etc">
              <FormHeader
                title="레이드 숙제 설정"
                description="최대 3개의 숙제를 미리 지정하거나 자동으로 구성할 수 있습니다"
                divider={false}
              />

              <Separator className="mb-2 mt-4" />
            </VerticalTabsTemplate.Content>
          </VerticalTabsTemplate>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default CharacterConfigDrawer
