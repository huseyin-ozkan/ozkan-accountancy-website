<script lang="ts">
	import { findCategoryTitle } from '$lib/common/categories'
	import AnnouncementDetailsDialog from '$lib/components/AnnouncementDetailsDialog.svelte'
	import dayjs from 'dayjs'

	interface Props {
		announcements: Announcement[]
	}

	let { announcements }: Props = $props()
</script>

<article>
	<h1>Duyurular</h1>

	<ul>
		{#if announcements.length === 0}
			<li>Duyurularımız burada yayınlanacaktır.</li>
		{/if}

		{#each announcements as a}
			<li>
				<a href={`#${a.id}`} title="Detayları gör">
					<span class="meta">
						<span class="date">
							{dayjs(a.createdAt).format('D MMMM YYYY')}
						</span>

						{#if a.category}
							<span class="category">
								{findCategoryTitle(a.category)?.title}
							</span>
						{/if}
					</span>

					<p class="name">
						{a.title}
					</p>
				</a>
			</li>
		{/each}
	</ul>
</article>

<AnnouncementDetailsDialog {announcements} />

<style lang="scss">
	article {
		flex: 1 0 200px;
		background-color: var(--color-base-300);
		padding: 24px;
		border-radius: var(--radius-card);
		width: 100%;
		max-width: 450px;

		@include xl {
			min-height: 100%;
			overflow: hidden;
		}
	}

	article h1 {
		@include title-5;
		margin-bottom: 24px;
	}

	article ul {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
		max-height: 600px;
		overflow-y: auto;
		margin-right: -8px;
	}

	ul a {
		max-width: 100%;

		display: flex;
		flex-direction: column;
		gap: 4px;

		&:hover {
			text-decoration: underline;
			cursor: pointer;
		}

		@include xl {
			min-width: 350px;
		}
	}

	ul li .name {
		@include caption-1;

		color: var(--color-neutral);

		// cut the text after 2 lines
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	ul li .meta {
		display: flex;
		gap: 10px;

		.date {
			@include label-2;
			color: var(--color-neutral-pale);
			opacity: 0.7;
		}

		.category {
			@include label-2;
			color: var(--color-neutral-vivid);
			opacity: 0.5;
		}
	}
</style>
